import { Router } from 'express';
import {
  getTasks,
  saveTask,
  getTask,
  updateTask,
  deleteTask,
  finishedTask,
} from './controller/TasksController';

const routes = Router();

routes.get('/home', (req, res) => {
  return res.json({ message: 'Hello Turma 007!' });
});

routes.get('/tasks', getTasks);
routes.post('/tasks', saveTask);
routes.get('/tasks/:id', getTask);
routes.put('/tasks/:id', updateTask);
routes.delete('/tasks/:id', deleteTask);
routes.patch('/tasks/:id', finishedTask);

export default routes;
