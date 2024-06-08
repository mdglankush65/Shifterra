import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id } = reqBody;

        const category = await Category.find({ user_id });
        if (!category) {
            return NextResponse.json({
                message: "Not found any data",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Category fetched Successfully",
            success: true,
            category
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}