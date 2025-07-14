import { createTask } from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState<string>('');
    const [descript, setDescript] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleBlur = () => {
        setTouched(true);

        if (title.trim() === '') {
            setError('El título es obligatorio');
        } else {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            setError('El titulo es obligatorio');
            return;
        } else {
            setError('');
        }

        const newTask = {
            title,
            description: descript,
        };

        await createTask(newTask);

        router.push('/tasksList');
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 flex flex-col gap-4">
            <Link href="/tasksList">
                <p className="text-[#14542e] hover:text-[#1d7040] hover:underline underline-offset-4 transition-colors duration-200 text-sm font-medium">Volver atrás</p>
            </Link>

            <section className="flex flex-col bg-white p-6 sm:p-8 rounded-lg gap-7 shadow-md">
                <h1 className="font-bold text-xl sm:text-2xl text-[#14542e]">Crear Nueva Tarea</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo" className="text-sm text-[#14542e]">
                            Título *
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleBlur}
                            className="border border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2"
                            placeholder="Ingrese el título de la tarea"
                        />
                        {error ? <p className="text-red-600 text-sm">{error}</p> : <p id="errorTitle" className="text-red-600 text-sm min-h-5" />}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="descrip" className="text-sm text-[#14542e]">
                            Descripción
                        </label>
                        <textarea
                            name="descrip"
                            onChange={(e) => setDescript(e.target.value)}
                            className="border border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2"
                            placeholder="Descripción (opcional)"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-5">
                        <button
                            type="submit"
                            className="sm:w-1/3 w-full rounded-lg border border-[#14542e] px-4 py-2 font-semibold text-sm bg-[#14542e] text-white hover:bg-[#1d7040] transition-colors">
                            Crear Tarea
                        </button>

                        <button
                            type="reset"
                            className="sm:w-1/3 w-full rounded-lg border border-[#14542e] bg-white text-[#14542e] px-4 py-2 font-semibold text-sm hover:bg-[#ebf5ed] active:bg-[#d0e9d5] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default TaskForm;
