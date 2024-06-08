import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, category_id } = reqBody;

        // Use deleteMany to delete all matching tasks
        const result = await Task.deleteMany({ user_id, category_id });

        if (result.deletedCount === 0)
            return NextResponse.json({ error: "No tasks found to delete." }, { status: 400 });

        return NextResponse.json({
            message: "Tasks deleted successfully",
            success: true
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}