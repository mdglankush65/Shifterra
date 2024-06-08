import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import axios from "axios";
import kraftbaseStore,{TaskType} from "@/app/store";

const TaskCard = ({
    _id,
    user_id,
    category_id,
    title,
    description,
    date,
    isCompleted
}:TaskType) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: _id.toString() });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const tasks = kraftbaseStore(state=> state.tasks);
    const setTasks = kraftbaseStore(state=> state.setTasks);
    const handleDeleteClick = async () => {
        try {
            const taskRes = await axios.post('/api/task/delete', { user_id, category_id, _id });
            console.log(taskRes);
            setTasks(tasks.filter(item=>item._id!==_id));
        } catch (error: any) {
            console.error("Error deleting task:", error.message);
        }
    };

    const handleIsTaskComplete = async () => {
        try {
            const taskRes = await axios.post('/api/task/update', {
                user_id, category_id, _id, title, description, date, isCompleted:!isCompleted });
            const newTask = tasks.filter(item => item._id===_id)[0];
            newTask.isCompleted = !isCompleted;
            setTasks([...tasks.filter(item => item._id !== _id),newTask]);
            console.log(taskRes);
        } catch (error: any) {
            console.error("Error updating task:", error.message);
        }
    };

    return (
        <div
            className="bg-gray-100 p-2 flex flex-col md:flex-row justify-between rounded-md touch-none shadow-md border-2 border-slate-300"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            <div className="task-info overflow-hidden">
                <div className="title-box flex gap-2 text-lg font-medium">
                    <button
                        className="text-xs md:text-sm"
                        onMouseDown={handleIsTaskComplete}
                    >
                        {isCompleted ? (
                            <FaCircleCheck className="text-green-600" />
                        ) : (
                            <FaRegCircle />
                        )}
                    </button>
                    <p
                        className={`task-title ${isCompleted ? "line-through" : ""
                            } text-slate-700 text-sm md:text-lg`}
                    >
                        {title}
                    </p>
                </div>
                <p
                    className={`task-desc mr-0 md:mr-12 lg:mr-20 break-words ml-8 md:ml-10 mt-1 md:mt-2 text-xs md:text-sm text-slate-400 ${isCompleted ? "line-through" : ""
                        }`}
                >
                    {description}
                </p>
            </div>
            <div className="task-opt flex flex-row items-center justify-end md:justify-normal gap-3 md:gap-5 mt-2 md:mt-0">
                <p className="task-date text-xs md:text-sm text-slate-600">
                    {date.toString()}
                </p>
                <button
                    className="bg-red-100 p-1 rounded-md text-red-600 cursor-pointer text-xs md:text-md lg:text-lg"
                    onMouseDown={handleDeleteClick}
                >
                    <RiDeleteBin5Line />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;