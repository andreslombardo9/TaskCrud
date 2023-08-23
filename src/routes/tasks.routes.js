import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getTasks,getTask,createTask,deleteTask,updateTask} from '../controllers/tasks.controller.js';
import { createTaskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
const router = Router();

//Obtener todas las tareas
router.get('/tasks', authRequired, getTasks);
//Obtener 1 tarea
router.get('/tasks/:id', authRequired, getTask);
//Agregar tarea
router.post('/tasks', authRequired, validateSchema(createTaskSchema),createTask);
//Eliminar tarea
router.delete('/tasks/:id', authRequired, deleteTask);
//Actualizar tarea
router.put('/tasks/:id', authRequired, updateTask);
export default router;