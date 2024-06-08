"use client";
import { useState } from "react";
import { SignUpSchema } from "@/validation/validate";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignUpImage from '@/../public/assets/Sign-Up-Animation.gif'

type SignupUser = z.infer<typeof SignUpSchema>;

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<SignupUser>({
        email: "",
        username: "",
        password: "",
    });

    const onSignUp = async () => {
        try {
            const validation = SignUpSchema.safeParse(user);

            if (!validation.success) {
                const newErrors: { [key: string]: string } = {};

                validation.error.errors.forEach((error) => {
                    const field = error.path[0];
                    newErrors[field] = error.message;
                });

                setErrors(newErrors);
                return;
            }

            const response = await axios.post('api/users/signUp', user);
            router.push('/login');
            toast.success("User created successfully. Please Login!");
        } catch (error: any) {
            toast.error("Something went wrong!");
            console.log("Error on Signing up ", error.message);
        }
    }
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors({});
        setUser((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="flex justify-center">
            <div className="sp-grid grid grid-rows-1 grid-cols-1 lg:grid-cols-2 p-10 w-full md:w-10/12">
                <div className="gif-box hidden lg:flex rounded-lg">
                    <Image src={SignUpImage} alt="SignUpImage" />
                </div>
                <div className="sp-form-box flex flex-col justify-center items-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">
                        Sign up to TaskCraft
                    </h2>
                    <div className="flex flex-col w-80 md:w-96 gap-5">
                        <div>
                            <label className="block text-gray-500 font-bold mb-1 pr-4">
                                Name
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                className="appearance-none border-2 border-gray-200 rounded-xl w-full p-2 md:p-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-200 hover:border-pink-200"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs italic mt-1 ml-3">
                                    {errors.username}
                                </p>
                            )}
                        </div>
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
                            {errors.password && (
                                <p className="text-red-500 text-xs italic mt-1 ml-3">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="btn-signup">
                            <button
                                className="shadow bg-custom-navy-blue focus:shadow-outline focus:outline-none text-black font-bold p-2 md:p-4 rounded-full w-full mt-3 md:mt-5 hover:bg-custom-navy-blue-hover"
                                onClick={onSignUp}
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;