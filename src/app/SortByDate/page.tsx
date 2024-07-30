"use client";
import { useState } from "react";
import kraftbaseStore, { CategoryType } from "@/app/store";
import { sortCategoriesAscending, sortCategoriesDescending } from "@/service/helper";

const SortByDate = () => {
    const [selectedSort, setSelectedSort] = useState<string>("Sort task by date");
    const categories = kraftbaseStore((s) => s.categories);
    const setCategories = kraftbaseStore((s) => s.setCategories)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOrder = e.target.value || "Sort task by date";
        setSelectedSort(selectedOrder);

        let updatedCategories;

        if (selectedOrder === "Ascending order") {
            updatedCategories = sortCategoriesAscending([...categories]);
        } else if (selectedOrder === "Descending order") {
            updatedCategories = sortCategoriesDescending([...categories]);
        } else {
            updatedCategories = categories;
        }
        setCategories(updatedCategories);
    };

    return (
        <select
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            value={selectedSort}
            onChange={handleChange}
        >
            <option value="Sort task by date" className="text-slate-900" disabled>
                Sort task by date
            </option>
            <option value="Ascending order" className="text-slate-900">
                Ascending order
            </option>
            <option value="Descending order" className="text-slate-900">
                Descending order
            </option>
        </select>
    );
};

export default SortByDate;