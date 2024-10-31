import User from "@/models/User"
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
        
        
        // return NextResponse.json({name:user.name, role:user.role , token }, {status:200 });
    
        const response = NextResponse.json({ name: user.name, role: user.role }, { status: 200 });
        response.cookies.set('role', user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day in seconds
        });

        return response;
    } catch (error) {
        console.error("Error parsing request:", error.message);
        return NextResponse.json({ error: error.message || "Failed to parse request" }, { status: 400 });
      }
}