import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);

            const response = await axios.post(
                "http://localhost:8000/api/admin/login",
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem('jwtToken', response.data.token);
            setSuccessMsg("✅ Login successfully!",);

            navigate('/admin')
        } catch (error) {
            setErrorMsg(
                `❌ ${error.response?.data?.message} !` || "❌ Login failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-black">
            <div className="max-w-2xl gap-15 w-full min-h-[55vh] bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/40 rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center">

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                    Admin Login
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-md">
                    <input
                        className="px-5 py-4 h-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter username or email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        className="px-5 py-4 h-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                        name="password"
                        autoComplete="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 h-8 hover:bg-blue-700 text-white font-semibold  rounded-xl transition"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                </form>
                {/* Error / Success messages */}
                {errorMsg && (
                    <div className="w-40 max-w-md mb-4 px-4 py-3 rounded-lg text-center bg-red-600/80 text-white font-medium">
                        {errorMsg}
                    </div>
                )}
                {successMsg && (
                    <div className="w-40 max-w-md mb-4 px-4 py-3 rounded-lg text-center bg-green-600/80 text-white font-medium">
                        {successMsg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
