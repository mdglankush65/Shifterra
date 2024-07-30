"use client";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CreateTaskModal from "@/app/task/CreateTaskModal/page";
import CreateCategoryModal from "@/app/category/CreateCategoryModal/page";
import DeleteCategoryModal from "@/app/category/DeleteCategoryModal/page";
import SearchComponent from "@/app/search/page";
import SortByDate from "@/app/SortByDate/page";
import CategoryContainer from "@/app/category/CategoryContainer/page";
import kraftbaseStore, { CategoryType } from '@/app/store';
import { IoNewspaperOutline } from "react-icons/io5";

const Dashboard = () => {
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
    const categories = kraftbaseStore((state) => state.categories);
    const saveCategories = kraftbaseStore((state) => state.saveCategories);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        saveCategories();
        // eslint-disable-next-line
    }, [refresh]);

    const handleDragEnd = async (event: DragEndEvent) => {
        try {
            const { active, over } = event;
            if (over) {
                const over_id = over.id?.toString();
                const active_id = active.id?.toString();

                const newLoc = await axios.post('/api/task/Task', { _id: over_id });
                const oldLoc = await axios.post('/api/task/Task', { _id: active_id });

                if (newLoc.data.tasks[0].category_id === oldLoc.data.tasks[0].category_id)
                    return;
                const response = await axios.post('/api/task/dragNdrop', {
                    _id: active_id,
                    new_category_id: newLoc.data.tasks[0].category_id
                });
                setRefresh(prev => !prev);
            }
        } catch (error: any) {
            toast.error("Not able to drop.");
            console.log("Error handling drag end:", error.message);
        }
    };

    return (
        <div className="p-5 h-auto min-h-screen">
            <div className="crud-box mb-8 flex flex-col justify-center items-center">
                <div className="flex flex-col lg:flex-row items-center justify-center mb-6">
                    <div className="mb-3 lg:mb-0">
                        <CreateTaskModal setRefresh={setRefresh} />
                        <CreateCategoryModal />
                    </div>
                    <div>
                        <SortByDate />
                        <DeleteCategoryModal />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <SearchComponent />
                </div>
            </div>
            <div className="flex justify-center ">
                {categories?.length === 0 ? (
                    <h2 className="text-center text-xl md:text-2xl text-slate-500 font-bold">
                        No tasks found. Create a task now!
                    </h2>
                ) : (
                    <div className="grid-container">
                        <DndContext
                            collisionDetection={closestCorners}
                            onDragEnd={handleDragEnd}
                            sensors={sensors}
                            autoScroll
                        >
                            {categories?.map((item: CategoryType) => (
                                <CategoryContainer
                                    key={item!._id}
                                    categoryTitle={item!.title}
                                    category_id={item._id || "---"}
                                    refresh={refresh}
                                />
                            ))}
                        </DndContext>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;