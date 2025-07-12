import { Response, Request } from 'express';
import { tasks } from '../data/taskData';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task';

//GET
export const allTask = (req: Request, res: Response) => {
    res.status(200).json(tasks);
};

export const taskById = (req: Request, res: Response) => {
    const taskId = req.params.id;
    const task = tasks.find((task) => task.id === taskId);

    res.status(200).json(task);
};

//POST
export const createTask = (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title.trim()) {
        return res.status(400).json({ error: 'El titulo es requerido' });
    }

    const newTask: Task = {
        id: uuidv4(),
        title: title.trim(),
        description: req.body.description.trim() || '',
        completed: false,
        createdAt: new Date(),
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
};

//PUT
export const updateTask = (req: Request, res: Response) => {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    const updatedTask: Task = tasks.find((task) => task.id === taskId);

    if (!updatedTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (!title.trim()) {
        return res.status(400).json({ error: 'El titulo es requerido' });
    }

    updatedTask.title = title.trim();
    updatedTask.description = description.trim() || '';
    updatedTask.completed = completed ? completed : updatedTask.completed;

    res.status(200).send(`Tarea actualizada`);
};

//DELETE
export const deleteTask = (req: Request, res: Response) => {
    const taskId = req.params.id;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tasks.splice(taskIndex, 1);

    res.status(200).send(`Tarea borrada`);
};
