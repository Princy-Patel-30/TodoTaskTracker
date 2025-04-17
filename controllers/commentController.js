import Comment from '../models/Comment.js';
import Task from '../models/Task.js';

export const createComment = async (req, res) => {
  try {
    const { task: taskId, text } = req.body; 
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in' });
    }
    
    if (!taskId || !text) {
      return res.status(400).json({ message: 'Task ID and text are required' });
    }
    console.log(taskId, text);
    
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
    const comments = await Comment.find({ task: taskId }).populate('user', 'email role name');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get comments', error });
  }
};
