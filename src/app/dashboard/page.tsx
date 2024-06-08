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
// import SearchComponent from "@/app/search/page";
// import SortByDate from "@/app/SortByDate/page";
import CategoryContainer from "@/app/category/CategoryContainer/page";
import kraftbaseStore, { CategoryType } from '@/app/store';

const Dashboard = () => {
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
    const user = kraftbaseStore((state) => state.user);
    const tasks = kraftbaseStore((state) => state.tasks);
    const categories = kraftbaseStore((state) => state.categories);
    const saveCategories = kraftbaseStore((state) => state.saveCategories);
    const setTasks = kraftbaseStore((state) => state.setTasks);

    useEffect(() => {
        saveCategories();
        console.log("fetched categories successfully ",categories);
        // eslint-disable-next-line
    }, []);

    const handleDragEnd = async (event: DragEndEvent) => {
        try {
            const { active, over } = event;
            if (over && active.id === over.id) {
                const over_id = over.id.toString();
                const active_id = active.id.toString();

                if (!over_id || !active_id) return;
                const response = await axios.post('/api/task/update', {
                    user_id: user!._id,
                    active_id,
                    over_id
                });
                console.log(response);
                let updatedTasks = tasks.filter(task => task.category_id !== over_id);
                let newTask = tasks.filter(task => task.category_id === over_id)[0];
                newTask.category_id = active_id;
                updatedTasks = [...updatedTasks, newTask];
                setTasks(updatedTasks);
            }
        } catch (error: any) {
            toast.error("Not able to drop.");
            console.error("Error handling drag end:", error.message);
        }
    };

    return (
        <div className="p-5 h-auto min-h-screen">
            <div className="crud-box mb-8 flex flex-col justify-center items-center">
                <div className="flex flex-col lg:flex-row items-center justify-center mb-6">
                    <div className="mb-3 lg:mb-0">
                        <CreateTaskModal />
                        <CreateCategoryModal />
                    </div>
                    <div>
                        {/* <SortByDate /> */}
                        <DeleteCategoryModal />
                    </div>
                </div>
                {/* <div className="w-full md:w-1/2"> */}
                {/* <SearchComponent /> */}
                {/* </div> */}
            </div>
            <div className="flex flex-col gap-5">
                {categories?.length === 0 ? (
                    <h2 className="text-center text-xl md:text-2xl text-slate-500 font-bold">
                        No tasks found. Create a task now!
                    </h2>
                ) : (
                    <DndContext
                        collisionDetection={closestCorners}
                        onDragEnd={handleDragEnd}
                        sensors={sensors}
                        autoScroll
                    >
                        {categories?.map((item: CategoryType) => (
                            <CategoryContainer
                                key={item._id}
                                categoryTitle={item.title}
                                category_id={item._id}
                            />
                        ))}
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default Dashboard;