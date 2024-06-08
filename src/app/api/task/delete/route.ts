import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, category_id, title } = reqBody;
        const task = await Task.findOneAndDelete({ user_id, category_id, title });
        if (!task)
            return NextResponse.json({ error: "Task not exists." }, { status: 400 });

        return NextResponse.json({
            message: "Task deleted Successfully",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}