import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, category_id } = reqBody;
        console.log("Yha tak aa rha h => user_id ",user_id," category_id ",category_id);
        const tasks = await Task.find({ user_id,category_id });
        // const tasks = await Task.find({ user_id,category_id });

        if (!tasks) {
            return NextResponse.json({
                message: "Not found any data",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Tasks fetched Successfully",
            success: true,
            tasks
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}