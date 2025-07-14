import { deleteTask, fetchTasks, updateTask } from '@/services/api';
import { Task } from '@/types/task';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetchTasks().then((data) => {
            if (!data) {
                setError(true);
            } else {
                setTasks(data);
            }
        });
    }, []);

    const handleToggleComplete = async (task: Task) => {
        const updatedTask = {
            title: task.title,
            description: task.description,
            completed: !task.completed,
        };

        try {
            await updateTask(task.id, updatedTask);

            setTasks((prev) => prev?.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)) || []);
        } catch (error) {
            alert('Error al actualizar el estado de la tarea');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        await deleteTask(id);

        setTasks((prev) => prev?.filter((task) => task.id !== id) || []);
    };

    if (error) {
        return (
            <div>
                <p className="text-center text-red-500">Error al cargar la lista</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#14542e]">Tareas</h1>
                <Link href="/taskForm" className="bg-[#14542e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1d7040] transition-all">
                    Nueva Tarea
                </Link>
            </div>

            {tasks && tasks.length > 0 ? (
                <div className="flex flex-col gap-4 bg-white p-4 sm:p-6 rounded-lg">
                    {tasks.map((task) => (
                        <article
                            key={task.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#c8d4c3] px-4 py-3 rounded-lg shadow-sm transition-all duration-200 hover:translate-x-[-2px] hover:shadow-[4px_4px_8px_#9bb89b]">
                            <div className="flex items-start gap-4 w-full sm:w-auto">
                                <button onClick={() => handleToggleComplete(task)} className="mt-1">
                                    {task.completed ? <FiCheckCircle className="text-[#0b4623] text-xl" /> : <MdRadioButtonUnchecked className="text-xl" />}
                                </button>

                                <Link href={`/taskItem/${task.id}`} className="flex-1">
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <h2 className="text-lg font-bold text-[#14542e]">{task.title}</h2>
                                        <p className="text-sm text-gray-600 truncate max-w-xs">{task.description}</p>
                                        <p className="text-xs text-gray-500">
                                            Creada: <span>{formatDate(task.createdAt)}</span>
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="flex gap-4 mt-4 sm:mt-0">
                                <Link href={`/taskItem/${task.id}`} title="Editar">
                                    <FaRegEdit className="text-xl text-[#14542e] hover:text-[#0a140e]" />
                                </Link>
                                <button onClick={() => handleDelete(task.id)} title="Eliminar">
                                    <FaRegTrashAlt className="text-red-500 text-xl hover:text-red-800" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No se encuentran tareas</p>
            )}
        </div>
    );
};

export default TaskList;
