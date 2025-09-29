import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("image", image);

            const response = await axios.post(
                "http://localhost:8000/api/admin/register",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSuccessMsg("✅ Registered successfully!");
        } catch (error) {
            setErrorMsg(
                `❌ ${error.response?.data?.message} !` || "❌ Registration failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-black">
            <div className="max-w-2xl gap-10 w-full min-h-[55vh] bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/40 rounded-2xl p-12 shadow-2xl flex flex-col items-center justify-center">
                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10">
                    Admin Register
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8 w-full max-w-md"
                >
                    <input
                        className="px-5 py-4 h-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        name="name"
                        autoComplete="name" 
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        className="px-5 py-4 h-10 text-center rounded-xl border border-gray-300 dark:border-gray-700 
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
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

                    {/* File Upload */}
                    <div className="flex w-full h-10 max-w-md items-center justify-start gap-4 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
    bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">

                        {/* Hidden Input */}
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={loading}
                        />

                        {/* Choose File button */}
                        <label
                            htmlFor="image"
                            className={`px-4 w-25 h-full text-center content-center rounded-lg cursor-pointer text-sm font-medium ${loading
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                }`}
                        >
                            Choose File
                        </label>

                        {/* File name or default text */}
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                            {image ? image.name : "Choose profile image"}
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`h-12 rounded-xl font-semibold transition ${loading
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        {loading ? "Registering..." : "Register"}
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

export default AdminRegister;
