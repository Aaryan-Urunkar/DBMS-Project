import { NextResponse } from "next/server";
import Lot from "@/models/Lot"
import User from "@/models/User"
import { connectToDB } from "@/mongoose/connectDB";

export async function GET(req , {params}){
    const userId = req.headers.get('x-user-id');
    await connectToDB();

    const user = await User.findOne({_id : userId});

    console.log(user);
    
    if(!user || user.role !== "buyer"){
        return NextResponse.json({msg : "Invalis user role"} , {status:400})
    }

    const allLots = await Lot.find();

    console.log(allLots);
    

    return NextResponse.json({msg : "Route is working" , allLots} , {status:200})
}