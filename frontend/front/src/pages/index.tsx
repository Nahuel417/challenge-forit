import Link from 'next/link';
import React from 'react';

const index = () => {
    return (
        <div className="flex flex-col items-center justify-center border-2 border-red-600 w-120 m-auto mt-10 gap-5 py-3.5 ">
            <h1 className="text-4xl text-red-700">Inicio</h1>

            <Link href="/tasksList">
                <p className="hover:text-amber-400 hover:underline">Ver todas las tareas</p>
            </Link>

            <Link href="/taskForm">
                <p className="hover:text-amber-400 hover:underline">Crear nueva tarea</p>
            </Link>
        </div>
    );
};

export default index;
