import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, title } = reqBody;

        const category = await Category.findOneAndDelete({ user_id, title });

        if (!category) {
            return NextResponse.json({
                message: "Category not found",
                success: false
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Category deleted Successfully",
            success: true
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}