import { fetchTaskById, updateTask } from '@/services/api';
import { Task } from '@/types/task';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const TaskItem = () => {
    const router = useRouter();
    const { id } = router.query;

    const [task, setTask] = useState<Task | null>(null);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [title, setTitle] = useState<string>('');
    const [descript, setDescript] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);
    const [formError, setFormError] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (!id) {
            return;
        }

        fetchTaskById(id).then((data) => {
            if (!data) {
                setFetchError(true);
            } else {
                setTitle(data.title);
                setDescript(data.description);
                setCompleted(data.completed);
                setTask(data);
                setLoading(false);
            }
        });
    }, [id]);

    useEffect(() => {
        if (!task) {
            return;
        }

        const isTitleChanged = title.trim() !== task.title.trim();
        const isDescriptionChanged = descript.trim() !== task.description?.trim();
        const isCompletedChanged = completed !== task.completed;

        if (isTitleChanged || isDescriptionChanged || isCompletedChanged) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [title, descript, completed, task]);

    const handleBlur = () => {
        setTouched(true);

        if (title.trim() === '') {
            setFormError('El título es obligatorio');
        } else {
            setFormError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            setFormError('El titulo es obligatorio');
            return;
        } else {
            setFormError('');
        }

        const newTask = {
            title,
            description: descript,
            completed,
        };

        try {
            await updateTask(id, newTask);

            router.push('/tasksList');
        } catch (error) {
            console.log('Error al actualizar tarea:', error);
            alert('Error al guardar los cambios');
        }
    };

    if (fetchError) {
        return (
            <div>
                <p>Error al cargar la información</p>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <div className="text-center mt-10">
                    <p className="text-[#14542e] font-medium">Cargando...</p>
                </div>
            ) : (
                <div className="w-full max-w-4xl mx-auto px-4 flex flex-col gap-4">
                    <Link href="/tasksList">
                        <p className="text-[#14542e] hover:text-[#1d7040] hover:underline underline-offset-4 transition-colors duration-200 text-sm font-medium">Volver atrás</p>
                    </Link>

                    <section className="flex flex-col bg-white p-6 sm:p-8 rounded-lg gap-7 shadow-md">
                        <h1 className="font-bold text-xl sm:text-2xl text-[#14542e]">Editar Tarea</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="titulo" className="text-sm text-[#14542e]">
                                    Título <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={handleBlur}
                                    value={title}
                                    className="border border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2"
                                    placeholder="Ingrese el título de la tarea"
                                />
                                {formError ? <p className="text-red-600 text-sm">{formError}</p> : <p id="errorTitle" className="text-red-600 text-sm min-h-5" />}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="descrip" className="text-sm text-[#14542e]">
                                    Descripción
                                </label>
                                <textarea
                                    name="descrip"
                                    onChange={(e) => setDescript(e.target.value)}
                                    value={descript}
                                    className="border border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2"
                                    placeholder="Descripción (opcional)"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" checked={completed} onChange={() => setCompleted((prev) => !prev)} className="w-4 h-4 rounded-full accent-[#14542e] cursor-pointer" />
                                <label htmlFor="estado" className="text-sm text-[#14542e]">
                                    Completada
                                </label>
                            </div>

                            <div className="flex justify-center mt-5">
                                <button
                                    type="submit"
                                    className={`w-full rounded-lg border border-[#14542e] px-4 py-2 font-semibold transition-all text-sm
                                ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60' : 'bg-[#14542e] text-white hover:bg-[#1d7040] cursor-pointer'}
                            `}
                                    disabled={isDisabled}>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </>
    );
};

export default TaskItem;
