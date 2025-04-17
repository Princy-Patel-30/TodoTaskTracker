import Task from '../models/Task.js';
import Notification from '../models/Notification.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority, assignedBy, assignedTo, status } = req.body;

    const task = new Task({
      title,
      description,
      deadline,
      priority,
      assignedBy,
      assignedTo,
      status,
    });
    await Promise.all(
      assignedTo.map((userId) =>
        Notification.create({
          recipient: userId,
          message: `You have been assigned a new task: "${title}"`,
          link: `/tasks/${task._id}`,
        })
      )
    );

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, deadline, priority, assignedBy, assignedTo, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, priority, assignedBy, assignedTo, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
};
