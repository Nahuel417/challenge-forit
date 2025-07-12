import { deleteTask, fetchTasks } from '@/services/api';
import { Task } from '@/types/task';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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

    const hanldeDelete = async (id) => {
        // const confirmacion = window.confirm('¿Querés guardar los cambios?');

        // if (!confirmacion) {
        //     return;
        // } else {
        await deleteTask(id);
        window.location.reload();
        // }
    };

    if (error) {
        return (
            <div>
                <p>Error al cargar la lista</p>
            </div>
        );
    }

    return (
        <div className="w-250 m-auto flex flex-col gap-4 ">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">Tareas</h1>
                <div className="flex">
                    <Link href="/taskForm">
                        <p className="border-1 border-[#14542e] p-1 text-sm">Nueva Tarea</p>
                    </Link>
                </div>
            </div>
            {tasks && tasks.length > 0 ? (
                <div className="flex flex-col gap-4 bg-[#ffffff] p-4 rounded-lg">
                    {tasks.map((task) => (
                        <article className="flex justify-between rounded-lg border-1 border-[#14542e] p-2 " key={task.id}>
                            <div className="flex gap-5 items-start">
                                <input type="checkbox" className="w-4 h-4 rounded-full accent-[#14542e]" />

                                <div>
                                    <h2 className="text">{task.title}</h2>
                                    <p>{task.description}</p>
                                    <p>Creada: {formatDate(task.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <Link href={`/taskItem/${task.id}`}>
                                    <p className="border-1 border-[#14542e] p-1 text-sm">Editar</p>
                                </Link>

                                <button onClick={() => hanldeDelete(task.id)} className="border-1 border-[#14542e] p-1 text-sm hover:cursor-pointer">
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div>
                    <p>No se encuentran tareas</p>
                </div>
            )}
        </div>
    );
};

export default TaskList;
