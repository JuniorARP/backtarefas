import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Tasks } from '../entity/Tasks';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await AppDataSource.getRepository(Tasks).find();
    console.log('Tarefas encontradas:', tasks);
    return res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

export const saveTask = async (req: Request, res: Response) => {
  try {
    const task = await AppDataSource.getRepository(Tasks).save(req.body);
    console.log('Tarefa salva:', task);
    return res.json(task);
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao salvar tarefa' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const task = await AppDataSource.getRepository(Tasks).findOneBy({ id });
    console.log('Tarefa encontrada:', task);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.json(task);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao buscar tarefa' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const task = await AppDataSource.getRepository(Tasks).update(id, req.body);

    if (task.affected === 1) {
      const taskUpdated = await AppDataSource.getRepository(Tasks).findOneBy({ id });
      console.log('Tarefa atualizada:', taskUpdated);
      return res.json(taskUpdated);
    } else {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const task = await AppDataSource.getRepository(Tasks).delete(id);

    if (task.affected === 1) {
      console.log('Tarefa excluída com sucesso');
      return res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } else {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    return res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
};

export const finishedTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const task = await AppDataSource.getRepository(Tasks).update(id, { finished: true });

    if (task.affected === 1) {
      const taskFinished = await AppDataSource.getRepository(Tasks).findOneBy({ id });
      console.log('Tarefa finalizada:', taskFinished);
      return res.json(taskFinished);
    } else {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao finalizar tarefa:', error);
    return res.status(500).json({ message: 'Erro ao finalizar tarefa' });
  }
};
