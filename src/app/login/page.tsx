"use client";
import { useState } from "react";
import { z } from "zod";
import { SignInSchema } from "@/validation/validate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import axios from 'axios';
import LoginImage from '@/../public/assets/Sign-In-Animation.gif'
import kraftbaseStore from '@/app/store';
import Link from "next/link";
import Shimmer from "../shimmer";

type SignInFormData = z.infer<typeof SignInSchema>;

const LoginPage = () => {
    const setUserData = kraftbaseStore(state => state.setUser);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [user, setUser] = useState<SignInFormData>({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        try {
            setLoading(true);
            const validation = SignInSchema.safeParse(user);

            if (!validation.success) {
                const newErrors: { [key: string]: string } = {};

                validation.error.errors.forEach((error) => {
                    const field = error.path[0];
                    newErrors[field] = error.message;
                });
                setLoading(false);
                setErrors(newErrors);
                return;
            }
            await axios.post('api/users/login', user);
            const res = await axios.get('/api/users/user');
            setLoading(false);
            setUserData(res.data.user);
            router.push(`/`);
            toast.success("User successfully logged in!");

        } catch (error: any) {
            setLoading(false);
            toast.error("User login error ")
            console.log("There is some error in logging In ", error.message);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors({});

        setUser((prevData) => ({ ...prevData, [name]: value }));
    };
    if (loading)
        return <Shimmer />
    return (
        <div className="flex justify-center h-full-screen">
            <div className="sp-grid grid grid-rows-1 grid-cols-1 lg:grid-cols-2 p-10 w-full md:w-10/12">
                <div className="gif-box  hidden lg:block rounded-lg  w-full-screen">
                    <Image src={LoginImage} alt="SignInImage" />
                </div>
                <div className="sp-form-box  flex flex-col justify-center items-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-12">
                        Sign in to KraftBase
                    </h2>
                    <div className="flex flex-col w-80 md:w-96 gap-5">
                        <div>
                            <label className="block text-gray-500 font-bold mb-1 pr-4">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="appearance-none border-2 border-gray-200 rounded-xl w-full p-2 md:p-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-200 hover:border-pink-200"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs italic mt-1 ml-3">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-500 font-bold mb-1 pr-4">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="appearance-none border-2 border-gray-200 rounded-xl w-full p-2 md:p-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-200 hover:border-pink-200"
                            />
                        </div>
                        <div className="btn-signup">
                            <button
                                className={`shadow bg-custom-navy-blue focus:shadow-outline focus:outline-none text-black border border-gray-300 font-bold p-2 md:p-4 rounded-full w-full mt-3 md:mt-5 hover:bg-custom-navy-blue-hover ${loading && "visibility:hidden"}`}
                                onClick={onLogin}
                            >
                                Sign in
                            </button>
                        </div>
                        <p>New User?
                            <Link href="/signUp" className="text-blue-700">Sign Up</Link>
                        </p>
                </div>
            </div>
        </div>
        </div >
    );
};

export default LoginPage;