import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { user_id, title } = reqBody;
        const category = await Category.findOne({ user_id, title });
        
        if (category)
            return NextResponse.json({ error: "Category already exists. Please use another title." }, { status: 400 });

        const newCategory = new Category({
            user_id, title
        });

        const savedCategory = await newCategory.save();
        
        return NextResponse.json({
            message: "Category created Successfully",
            success: true,
            savedCategory,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}