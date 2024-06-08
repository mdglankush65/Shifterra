import { create } from "zustand";
import axios from "axios";

// export type TaskType = z.infer<typeof TaskSchema>;
// export type CategoryType = z.infer<typeof CategorySchema>;

export interface TaskType {
    _id: string,
    user_id: string | null,
    category_id: string,
    title: string,
    description: string,
    date: Date,
    isCompleted?: Boolean
}

export interface CategoryType {
    _id: string,
    user_id: string,
    title: string
}

export interface UserType {
    _id: string,
    username: string,
    email: string,
    password?: string,
    isVerified?: Boolean,
    isAdmin?: Boolean,
    forgotPasswordToken?: string,
    forgotPasswordTokenExpiry?: Date,
    verifyToken?: string,
    verifyTokenExpiry?: Date
}

export interface TaskCraftStore {
    user: UserType | null;
    categories: CategoryType[];
    tasks: TaskType[];
    setUser: (user: UserType | null) => void;
    setCategories: (updatedCategories: CategoryType[]) => void;
    setTasks: (updatedTasks: TaskType[]) => void;
    saveTasks: (category_id: string) => void;
    saveCategories: () => void;
}

const kraftbaseStore = create<TaskCraftStore>((set,get) => ({
    user: null,
    categories: [],
    tasks: [],
    setUser: (user) => set({ user }),
    setCategories: (updatedCategories) => set({ categories: updatedCategories }),
    setTasks: (updatedTask) => set({ tasks: updatedTask }),
    saveCategories: async () => {
        const { user } = get();
        try {
            console.log(user);
            const categoryRes = await axios.post('/api/category/Category', { user_id: user!._id });
            console.log(categoryRes);
            set({categories: categoryRes.data.category});
        } catch (error: any) {
            console.error("Error fetching categories:", error.message);
        }
    },
    saveTasks: async (category_id) => {
        // api call here
        const { user } = get();
        try {
            const response = await axios.post('/api/task/Task', { user_id: user!._id, category_id });
            console.log(response.data); // Response might contain different structure
            set({ tasks: response.data.tasks });
        } catch (error: any) {
            console.error(error.message); // Printing error instead of throwing
        }
    },
}));

export default kraftbaseStore;