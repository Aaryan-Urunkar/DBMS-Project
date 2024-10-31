import User from "../../../../models/User"
import { NextResponse } from "next/server";
import { connectToDB } from "@/mongoose/connectDB";

export async function POST(req , {params}) {
    try{
        await connectToDB();   
        const data = await req.json(); // Parse JSON from request
        //console.log("Received data:", data);

        if(!data.username || !data.password){
            throw new Error("Credentials missing");
        }

        const user = await User.findOne({ username : data.username })
        if (!user) {
            throw new Error('Invalid Credentials')
        }

        const isPasswordCorrect = await user.comparePassword(data.password)
        if (!isPasswordCorrect) {
            throw new Error('Invalid Password')
        }

        const token = user.createJWT()
        
        
        console.log("Sending response:", { name: user.name, token });
        return NextResponse.json({name:user.name , token }, {status:200 });
    } catch (error) {
        console.error("Error parsing request:", error.message);
        return NextResponse.json({ error: error.message || "Failed to parse request" }, { status: 400 });
      }
}