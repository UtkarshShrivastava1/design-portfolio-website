
import admin from "@/app/models/adminModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        // console.log(body)
    const {email,password} = body;

    const User = await admin.findOne({email});
    // console.log(User)

    if(!User){
        return NextResponse.json({
    message: "Admin Not Found"
}, { status: 404 });

    }

    const validPassword = await bcrypt.compare(password,User.password);

    if(!validPassword){
        return NextResponse.json({
    message: "Invalid password"
}, { status: 401 });

    }

    const tokenData = {
        id:User._id
    }
    const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{
        expiresIn:"24h"
    })

    const response = NextResponse.json({
        message:"Logged in"
    })

    response.cookies.set("token",token)

    return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"Error in login from catch"
        })
    }

}