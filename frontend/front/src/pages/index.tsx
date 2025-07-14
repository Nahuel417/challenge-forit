import Link from 'next/link';
import React from 'react';

const index = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto mt-16 gap-6 p-6 sm:p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#14542e] text-center">Bienvenido</h1>

            <Link href="/tasksList">
                <p className="text-[#14542e] hover:text-[#1d7040] hover:underline underline-offset-4 transition-all text-base sm:text-lg">Ver todas las tareas</p>
            </Link>

            <Link href="/taskForm">
                <p className="text-[#14542e] hover:text-[#1d7040] hover:underline underline-offset-4 transition-all text-base sm:text-lg">Crear nueva tarea</p>
            </Link>
        </div>
    );
};

export default index;
