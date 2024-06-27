import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, category_id, title, description, date, isCompleted } = reqBody;
        const task = await Task.findOne({ user_id, category_id, title });

        if (task)
            return NextResponse.json({ error: "Task already exists. Please use another category id." }, { status: 400 });

        const newTask = new Task({
            user_id, category_id, title, description, date, isCompleted
        });

        const savedTask = await newTask.save();

        return NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedTask,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}