import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request:NextRequest) => {
    try {
        let token = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET_TOKEN!);
        return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}