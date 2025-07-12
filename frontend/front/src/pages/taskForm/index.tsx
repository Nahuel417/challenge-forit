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
        <div className="w-250 m-auto flex flex-col gap-4">
            <Link href="/tasksList">
                <p className="hover:text-amber-400 hover:underline"> Volver atras </p>
            </Link>
            <section className="flex flex-col  bg-[#ffffff] p-6 rounded-lg gap-7">
                <h1 className="font-bold text-xl text-[#14542e]"> Crear Nueva Tarea</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo">Titulo *</label>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleBlur}
                            className="border-1 border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2 "
                            placeholder="Ingrese el titulo de la tarea"
                        />
                        {error ? <p className="text-red-600 text-sm">{error}</p> : <p id="errorTitle" className="text-red-600 text-sm min-h-5"></p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="descrip">Descripción</label>
                        <textarea
                            name="descrip"
                            onChange={(e) => setDescript(e.target.value)}
                            className="border-1 border-transparent rounded-sm bg-[#c8d4c3] text-sm p-2 "
                            placeholder="Descripción (Opcional)"></textarea>
                    </div>
                    <div className="flex justify-between mt-5">
                        <button type="submit" className="border-1 border-[#14542e] w-1/3 rounded-lg hover:cursor-pointer ">
                            Crea Tarea
                        </button>

                        <button type="reset" className="border-1 border-[#14542e] w-1/3 rounded-lg hover:cursor-pointer ">
                            Cancelar
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default TaskForm;
