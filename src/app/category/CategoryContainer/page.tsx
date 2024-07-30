"use client";
import { useEffect, useState } from "react";
import TaskCard from "@/app/task/Task/page";
import { SortableContext } from "@dnd-kit/sortable";
import kraftbaseStore, { TaskType } from "@/app/store";
import axios from 'axios';
import toast from "react-hot-toast";

// Custom sorting strategy to prevent dragging
const noSortingStrategy = () => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
});

const CategoryContainer = ({ categoryTitle, category_id, refresh }: { categoryTitle: string, category_id: string, refresh: boolean }) => {
    const [tasks, setTasks] = useState([]);
    const user = kraftbaseStore(state => state.user);

    const fetchTasks = async () => {
        try {
            const response = await axios.post('/api/task/Task', { user_id: user?._id, category_id });

            setTasks(response.data.tasks);
            toast.success("Tasks fetched Successfully");
        } catch (error) {
            toast.error("Not able to fetch the tasks.");
            console.log("Error in fetching tasks", error);
        }
    }

    useEffect(() => {
        fetchTasks();

        // eslint-disable-next-line
    }, [refresh]);

    const handleDeleteClick = async (_id: string) => {
        try {
            const taskRes = await axios.post('/api/task/delete', { _id });

            toast.success("Task deleted");
            fetchTasks();
        } catch (error: any) {
            toast.error("Failed to delete task");
            console.error("Error deleting task:", error.message);
        }
    };

    const handleIsTaskComplete = async ({
        _id,
        user_id,
        category_id,
        title,
        description,
        date,
        isCompleted }: TaskType) => {
        try {
            const taskRes = await axios.post('/api/task/update', {
                user_id, category_id, _id, title, description, date, isCompleted: !isCompleted
            });

            toast.success("Task Updated");
            fetchTasks();
        } catch (error: any) {
            toast.error("Task failed to Update")
            console.error("Error updating task:", error.message);
        }
    };

    return (
        tasks.length > 0 && (
            <div className="shadow-md p-2 pt-0 mx-0 md:mx-2 lg:mx-1 rounded-2xl border-2 border-gray-200 h-60 overflow-y-auto">
                <div className="sticky bg-white top-0 flex flex-row gap-2 items-center text-slate-600">
                    <h2 className="text-xl md:text-2xl font-semibold">{categoryTitle}</h2>
                    <p className="text-xs md:text-sm">{`(${tasks.length})`}</p>
                </div>
                <div className="tasks py-5 px-0 md:px-8 lg:px-3 flex flex-col gap-2">
                    <SortableContext items={tasks} strategy={noSortingStrategy}>
                    {tasks.map((task: TaskType) => (
                        <TaskCard
                            key={task._id}
                            {...task}
                            handleDeleteClick={() => handleDeleteClick(task._id)}
                            handleIsTaskComplete={() => handleIsTaskComplete(task)}
                        />
                    ))}
                    </SortableContext>
                </div>
            </div>
        )
    );
};

export default CategoryContainer;