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
    setUser: (user: UserType | null) => void;
    setCategories: (updatedCategories: CategoryType[]) => void;
    saveCategories: () => void;
}

const kraftbaseStore = create<TaskCraftStore>((set,get) => ({
    user: null,
    categories: [],
    setUser: (user) => set({ user }),
    setCategories: (updatedCategories) => set({ categories: updatedCategories }),
    saveCategories: async () => {
        const { user } = get();
        try {
            const categoryRes = await axios.post('/api/category/Category', { user_id: user!._id });
            set({categories: categoryRes.data.category});
        } catch (error: any) {
            console.error("Error fetching categories:", error.message);
        }
    },
}));

export default kraftbaseStore;