import User from "@/models/User.js"
import { connectToDB } from "@/mongoose/connectDB";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectToDB();
    const userId = req.headers.get("x-user-id");
    const userName = req.headers.get("x-user-name");
    const data = await req.json();

    const newUser = await User.findByIdAndUpdate({_id : userId , name : userName} , { role : data.role} , { new: true, runValidators: true })
    
    return NextResponse.json({message:'Route is working' }, {status:200 });
}