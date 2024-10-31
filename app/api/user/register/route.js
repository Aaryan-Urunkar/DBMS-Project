import User from "../../../../models/User"
import { NextResponse } from "next/server";
import { connectToDB } from "@/mongoose/connectDB";

export async function POST(req , {params}) {
    try {
        const data = await req.json(); // Parse JSON from request
        console.log("Received data:", data);

        if(!data.name || !data.username || !data.password){
            throw new Error("Insufficient data provided to create new user...");
        }

        await connectToDB();

        const usernameAlreadyExists = await User.findOne({username:data.username})
        if(usernameAlreadyExists){
          throw new Error("This username already exists...");
        }
        
        //await User.collection.dropIndex("email_1"); // drop the unique index if it exists

        const newUser = await User.create({...data});
        const token = newUser.createJWT()
        console.log("All is well")

        console.log(`Generated token : ${token}`);
        
        return NextResponse.json({ message: "Successful request", ...data , token });
      } catch (error) {
        console.error("Error parsing request:", error.message);
        return NextResponse.json({ error: error.message || "Failed to parse request" }, { status: 400 });
      }
}