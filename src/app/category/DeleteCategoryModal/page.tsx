import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import kraftbaseStore from "@/app/store";

const DeleteCategoryModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = kraftbaseStore((state) => state.user);
    const categories = kraftbaseStore((state) => state.categories);
    const setCategories = kraftbaseStore((state) => state.setCategories);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleClick = async (category_id: string, category_title: string) => {
        try {
            await axios.post('/api/task/deleteAll', { user_id: user!._id, category_id });
            await axios.post('/api/category/delete', { user_id: user!._id,category_title });
            const categorySet = categories.filter(item => item.title !== category_title);
            setCategories(categorySet);
            toast.success(`${category_title} deleted successfully!`);
        } catch (error: any) {
            console.error("Error deleting category:", error.message);
            toast.error(`Failed to delete ${category_title}`);
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                <span className="flex gap-2 items-center">
                    <p>Delete Category</p>
                    <p>
                        <MdDeleteOutline fontSize={18} />
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
                                <p className="text-2xl font-bold">Delete Category</p>
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
                            <div className="my-5 flex flex-col gap-2">
                                {categories?.map((item: any) => (
                                    <p
                                        key={item.id}
                                        className="border border-gray-200 p-3 rounded-md"
                                    >
                                        <span className="flex flex-row justify-between">
                                            <span>{item.title}</span>
                                            <button
                                                className="bg-red-100 p-1 rounded-md text-red-600 cursor-pointer"
                                                onClick={() => handleClick(item.id, item.title)}
                                            >
                                                <RiDeleteBin5Line />
                                            </button>
                                        </span>
                                    </p>
                                ))}
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                                    onClick={() => closeModal()}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteCategoryModal;