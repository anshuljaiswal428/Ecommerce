import React, { useState } from "react";

const AdminLogin = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username: ",userName," Password: ",password);
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-black">
            <div className="max-w-2xl gap-10 w-full min-h-[50vh] bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/40 rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center">

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-80">
                    Admin Login
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md">
                    <input
                        className="px-5 py-4 h-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter username or email"
                        name="username"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="px-5 py-4 h-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 h-8 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
