import Comment from '../models/Comment.js';
import Task from '../models/Task.js';

export const createComment = async (req, res) => {
  try {
    const { taskId, text } = req.body;
    const userId = req.user._id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const comment = await Comment.create({ task: taskId, user: userId, text });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

export const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await Comment.find({ task: taskId }).populate('user', 'email role');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get comments', error });
  }
};
