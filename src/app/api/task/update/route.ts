import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, category_id, title, ...updateData } = reqBody;

        // Find the old task data before updating
        const oldTask = await Task.findOne({ user_id, category_id, title });
        if (!oldTask) {
            return NextResponse.json({ error: "Task does not exist." }, { status: 400 });
        }

        // Update task with the new data
        const updatedTask = await Task.findOneAndUpdate(
            { user_id, category_id, title },
            updateData,
            { new: true } // Returns the updated document
        );

        return NextResponse.json({
            message: "Task updated successfully",
            success: true,
            oldTask,
            updatedTask
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}