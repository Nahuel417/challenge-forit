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

        if (isTitleChanged || isDescriptionChanged) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [title, descript, task]);

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
                <div>
                    <p>Cargando...</p>
                </div>
            ) : (
                <div className="w-200 m-auto flex flex-col gap-4">
                    <Link href="/tasksList">
                        <p className="hover:text-amber-400 hover:underline"> Volver atras </p>
                    </Link>
                    <section className="flex flex-col  bg-[#ffffff] p-6 rounded-lg gap-7">
                        <h1 className="font-bold text-xl text-[#14542e]"> Editar Tarea</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="titulo">Titulo *</label>
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={handleBlur}
                                    className="border-1 border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2 "
                                    placeholder="Ingrese el titulo de la tarea"
                                    value={title}
                                />
                                {formError ? <p className="text-red-600 text-sm">{formError}</p> : <p id="errorTitle" className="text-red-600 text-sm min-h-5"></p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="descrip">Descripción</label>
                                <textarea
                                    name="descrip"
                                    onChange={(e) => setDescript(e.target.value)}
                                    className="border-1 border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2 "
                                    placeholder="Descripción (Opcional)"
                                    value={descript}></textarea>
                            </div>

                            <div className="flex justify-center mt-5">
                                <button
                                    type="submit"
                                    className={`w-full rounded-lg border border-[#14542e] px-4 py-1 font-semibold transition-all text-sm
                                    ${isDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60' : 'bg-[#14542e] text-white hover:bg-[#1d7040] cursor-pointer'}`}
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
