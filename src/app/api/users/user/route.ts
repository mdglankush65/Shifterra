import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbConfig';

connect();

export async function GET(request:NextRequest){
    try {
        const userId:String = await getDataFromToken(request);

        const user = await User.findById(userId).select("username email");

        return NextResponse.json({ message: 'Successfully got the data', success:true, user }, { status: 201 });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}