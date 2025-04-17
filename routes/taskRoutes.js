// taskRoutes.js
import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js'; 
import { roleCheck } from '../middleware/roleMiddleware.js'; 

const router = express.Router();


router.get('/', getTasks);
router.use(protect); 
 
router.post('/', roleCheck('admin'), createTask); 


router.get('/', getTasks);


router.get('/:id', getTaskById);

router.put('/:id', roleCheck('admin'), updateTask); 


router.delete('/:id', roleCheck('admin'), deleteTask); 

export default router;
