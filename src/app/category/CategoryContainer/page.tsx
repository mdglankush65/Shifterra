import { useEffect } from "react";
import TaskCard from "@/app/task/Task/page"; 
// import { SortableContext } from "@dnd-kit/sortable";
import kraftbaseStore,{TaskType} from "@/app/store";

// Custom sorting strategy to prevent dragging
const noSortingStrategy = () => ({
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
});

const CategoryContainer = ({ category_id, categoryTitle }: { category_id: string, categoryTitle: string }) => {
    const tasks = kraftbaseStore(state => state.tasks);
    const saveTasks = kraftbaseStore(state => state.saveTasks);

    useEffect(() => {
        saveTasks(category_id);
        console.log(tasks);
        // eslint-disable-next-line
    }, []);

    return (
        tasks.length > 0 && (
            <div className="shadow-md p-5 mx-0 md:mx-12 lg:mx-16 rounded-2xl border-2 border-gray-200">
                <div className="flex flex-row gap-2 items-center text-slate-600">
                    <h2 className="text-xl md:text-2xl font-semibold">{categoryTitle}</h2>
                    <p className="text-xs md:text-sm">{`(${tasks.length})`}</p>
                </div>
                <div className="tasks py-5 px-0 md:px-8 lg:px-10 flex flex-col gap-2">
                    {/* <SortableContext items={tasks} strategy={noSortingStrategy}> */}
                    {tasks.map((task: TaskType) => (
                        <TaskCard
                            key={task._id}
                            {...task}
                        />
                    ))}
                    {/* </SortableContext> */}
                </div>
            </div>
        )
    );
};

export default CategoryContainer;