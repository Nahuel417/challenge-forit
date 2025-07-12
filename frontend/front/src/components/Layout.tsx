import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col items-center p-2  bg-[#f5f5f5] text-gray-900">
            <header className="w-full py-4 rounded-lg bg-[#14542e] text-white text-center text-8xl font-bold shadow">ToDo App</header>

            <main className="w-full px-4 py-6">{children}</main>
        </div>
    );
};

export default Layout;
