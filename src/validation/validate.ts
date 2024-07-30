import { z } from "zod";

export const SignUpSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Name should be at least 3 characters long" })
        .max(50),
    email: z.string().email({ message: "Please provide a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" })
        .max(50),
});

export const SignInSchema = z.object({
    email: z.string().email({ message: "Please provide a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" })
        .max(50),
});

export const CategorySchema = z.object({
    user_id: z.string(),
    _id: z.string().min(1).max(50),
    title: z.string().min(3).max(50),
});

export const TaskSchema = z.object({
    user_id: z.string(),
    title: z.string().min(3).max(50),
    description: z.string().min(3).max(500),
    category_id: z.string(),
    date: z.string().min(10).max(10),
    isCompleted: z.boolean(),
});

export const TaskFormSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title should be of 3 character(s)" })
        .max(50),
    description: z
        .string()
        .min(8, { message: "Description should be of 8 character(s)" })
        .max(500),
    category: z.string().refine((value) => !!value, {
        message: "Category is required",
        path: ["category"],
    }),
    date: z.string().refine((value) => !!value, {
        message: "Date is required",
        path: ["date"],
    }),
});
