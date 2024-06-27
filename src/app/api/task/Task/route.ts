import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { _id, user_id, category_id } = reqBody;
        let query;
        if(_id)
            query={_id};
        else
            query = { user_id, category_id };
        const tasks = await Task.find(query);

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