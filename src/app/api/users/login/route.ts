import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request:NextRequest){
    try {
        await connect();
        const reqBody = await request.json();
        const {email,password}=reqBody;

        const user = await User.findOne({email});
    
        if(!user)
            return NextResponse.json({message:"User doesn't exists."},{status:400});

        const validate = await bcryptjs.compare(password,user.password);

        if(!validate)
            return NextResponse.json({message:"Please use valid credentials."},{status:400});

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_TOKEN!, {expiresIn:'1d'});

        const response = NextResponse.json({
            message:"User logged in successfully",
            success: true,
        });

        response.cookies.set('token', token, { httpOnly: true });
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}