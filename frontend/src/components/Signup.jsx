import axios from "axios";
import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";


function Signup() {

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target)

        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            password: formData.get("password")
        }

        try {
            const user = await axios.post("http://localhost:4000/auth/signup", body);

            toast.success(user.data.message, { theme: "dark" });

            navigate("/login");
        } catch (err) {
            toast.error(err.response.data.message, { theme: "dark" })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white w-[100vw]">
            <div className="w-[380px] bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input className="border p-2 rounded" name="name" type="text" placeholder="Name" required />
                    <input className="border p-2 rounded" name="email" type="email" placeholder="Email" required />
                    <input className="border p-2 rounded" name="phoneNumber" type="number" placeholder="Phone number" required />
                    <input className="border p-2 rounded" name="password" type="password"placeholder="Password" required />
                    <input type="submit" value="Sign Up" className="bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-medium transition" />
                </form>

                <p className="mt-5 text-sm text-center text-gray-400">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;