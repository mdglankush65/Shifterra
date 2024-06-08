import React, { useState } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { z } from "zod";
import { TaskFormSchema } from "@/validation/validate";
import toast from "react-hot-toast";
import axios from "axios";
import kraftbaseStore from "@/app/store";

type FormDataType = z.infer<typeof TaskFormSchema>;

const CreateTaskModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const user = kraftbaseStore((state) => state.user);
    const categories = kraftbaseStore((state) => state.categories);
    const saveTasks = kraftbaseStore((state) => state.saveTasks);
    const [taskFormData, setTaskFormData] = useState<FormDataType>({
        title: "",
        description: "",
        category: "",
        date: "",
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const validation = TaskFormSchema.safeParse(taskFormData);
            if (!validation.success) {
                const newErrors: { [key: string]: string } = {};

                validation.error.errors.forEach((error) => {
                    const field = error.path[0] as string;
                    newErrors[field] = error.message;
                });

                setErrors(newErrors);
                return;
            }
            const newTask= {
                user_id: user!._id,
                category_id: taskFormData.category,
                ...taskFormData
            }
            await axios.post('/api/task/create', newTask);
            saveTasks(taskFormData.category);
            closeModal();
            setTaskFormData({
                title: "",
                description: "",
                category: "",
                date: "",
            });
            toast.success("Task added successfully!");
        } catch (error: any) {
            toast.error("Error in adding task");
            throw new Error(error.message);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTaskFormData((prev) => ({ ...prev, [name]: value }));

        setErrors({});
    };

    return (
        <>
            <button
                onClick={openModal}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                <span className="flex gap-2 items-center">
                    <p>Create Task</p>
                    <p>
                        <MdPlaylistAdd fontSize={20} />
                    </p>
                </span>
            </button>

            {isOpen && (
                <div
                    className="main-modal fixed w-full h-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
                    style={{ background: "rgba(0,0,0,.7)" }}
                    onClick={closeModal}
                >
                    <div
                        className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <div>
                                    <p className="text-2xl font-bold">Create Task</p>
                                    <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                                        Enter your details to create task.
                                    </p>
                                </div>
                                <div
                                    className="modal-close cursor-pointer z-50"
                                    onClick={closeModal}
                                >
                                    <svg
                                        className="fill-current text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="my-5">
                                <div className="flex flex-col gap-6">
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            name="title"
                                            value={taskFormData.title}
                                            onChange={handleChange}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Title
                                        </label>
                                        {errors.title && (
                                            <p className="text-red-500 text-xs italic mt-1 ml-3">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" "
                                            name="description"
                                            value={taskFormData.description}
                                            onChange={handleChange}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Description
                                        </label>
                                        {errors.description && (
                                            <p className="text-red-500 text-xs italic mt-1 ml-3">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        {categories?.length === 0 ? (
                                            <p className="text-red-500 text-md font-semibold mt-1 ml-3">
                                                Create Category First!
                                            </p>
                                        ) : (
                                            <select
                                                id="categories"
                                                className="border border-gray-300 text-gray-900 text-sm rounded-md focus:border-2 focus:border-pink-500 block w-full p-2.5 outline-none"
                                                name="category"
                                                value={taskFormData.category}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled>
                                                    Choose a category
                                                </option>
                                                {categories.map(category => (
                                                    <option
                                                        value={category._id}
                                                        key={category._id}
                                                        className="text-gray-900"
                                                    >
                                                        {category.title}
                                                    </option>
                                                ))}
                                            </select>

                                        )}
                                        {errors.category && (
                                            <p className="text-red-500 text-xs italic mt-1 ml-3">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative h-11 w-full min-w-[200px] flex justify-between items-center">
                                        <input
                                            type="date"
                                            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:border-2 focus:border-pink-500"
                                            name="date"
                                            value={taskFormData.date}
                                            onChange={handleChange}
                                        />
                                        {errors.date && (
                                            <p className="text-red-500 text-xs italic mt-1 ml-3">
                                                {errors.date}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="focus:outline-none px-4 bg-pink-600 p-3 ml-3 rounded-lg text-white hover:bg-pink-400"
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateTaskModal;