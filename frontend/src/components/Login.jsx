import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const body = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        try {
            const user = await axios.post("http://localhost:4000/auth/login", body);

            localStorage.setItem("id", user.data.user._id);
            localStorage.setItem("name", user.data.user.name);

            toast.success(user.data.message, {
                position: "top-left",
                autoClose: 2000,
                theme: "light",
            });

            setTimeout(() => navigate("/"), 1000)
        } catch (err) {
            toast.error(err.response?.data?.message, {
                position: "top-left",
                autoClose: 2000,
                theme: "light",
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white w-[100vw]">
            <div className="w-[360px] bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-center">Login</h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" name="email" className="border p-2 rounded" required />
                    <input type="password" placeholder="Password" name="password" className="border p-2 rounded" required />

                    <input type="submit" value="Log In" className="bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium transition" />
                </form>

                <p className="mt-5 text-sm text-center text-gray-400">
                    Don’t have an account?
                    <Link to="/signup" className="text-blue-500 ml-1 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;