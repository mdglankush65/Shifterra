"use client";
import { useState } from "react";
import {TaskType} from "@/app/store";
import { IoSearch } from "react-icons/io5";

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [task,setTasks] = useState<TaskType[]>([]);

    // let originalTasks = JSON.parse(
    //     localStorage.getItem(process.env.VITE_LOCAL_STORAGE_TASK!) || "[]"
    // );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handleSearchButton = () => {
        // if (searchQuery === "") {
        //     console.log("Hell yeah");
        //     console.log(originalTasks);

        //     saveTasks(originalTasks);
        //     return;
        // }

        // const filteredTasks = tasks.filter((task) =>
        //     task.title.toLowerCase().includes(searchQuery)
        // );

        // if (filteredTasks.length > 0) saveTasks(filteredTasks);
    };

    return (
        <div className="flex flex-row items-center">
            <input
                type="text"
                className="w-full backdrop-blur-sm bg-white/20 py-2 pl-5 pr-4 rounded-lg focus:outline-none border-2 border-gray-300 focus:border-violet-300 transition-colors duration-300"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSearchButton}
            >
                <IoSearch fontSize={18} />
            </button>
        </div>
    );
};

export default SearchComponent;