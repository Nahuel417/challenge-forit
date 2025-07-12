import { Task } from '../types/task';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTasks = async (): Promise<Task[] | null> => {
    try {
        const res = await fetch(`${API_URL}/task`);
        if (!res.ok) {
            throw new Error('Error al obtener las tareas');
        }

        const data = await res.json();

        return data.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
        }));
    } catch (error) {
        return null;
    }
};

export const fetchTaskById = async (id): Promise<Task | null> => {
    try {
        const res = await fetch(`${API_URL}/task/${id}`, { method: 'GET' });

        if (!res.ok) {
            throw new Error('Error al obtener las tareas');
        }

        const data = await res.json();

        return data;
    } catch (error) {
        return null;
    }
};

export const createTask = async (task): Promise<Task | null> => {
    try {
        const res = await fetch(`${API_URL}/task`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            throw new Error('Error al crear la tarea');
        }

        return await res.json();
    } catch (error) {
        return null;
    }
};

export const updateTask = async (id, task): Promise<string | null> => {
    try {
        const res = await fetch(`${API_URL}/task/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            throw new Error('Error al modificar la tarea');
        }

        return await res.text();
    } catch (error) {
        return null;
    }
};

export const deleteTask = async (id): Promise<string | null> => {
    try {
        const res = await fetch(`${API_URL}/task/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Error al eliminar la tarea');
        }

        return await res.text();
    } catch (error) {
        return null;
    }
};
