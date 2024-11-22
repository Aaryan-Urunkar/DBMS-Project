import { NextResponse } from "next/server";
import Lot from "@/models/Lot"
import User from "@/models/User"
import { connectToDB } from "@/mongoose/connectDB";

export async function GET(req){

    const userId = req.headers.get('x-user-id');
    const lotId = req.nextUrl.searchParams.get("lotId")
    console.log(req.nextUrl.searchParams.get("lotId"));

    if(!lotId){
        return NextResponse.json({ msg : "Lot ID not specified"} , {status : 400})
    }
    
    
    if(!userId){
        return NextResponse.json(
            {
                msg : "Auth error... userId not found"
            } , {
                status:400
            }
        )
    }
    await connectToDB();

    const user = await User.findOne({_id : userId});

    const lot = await Lot.findOne( {_id : lotId})

    // console.log(lot);
    
    if(!user ){
        return NextResponse.json({msg : "User not found"} , {status:400})
    }

    // console.log(user);
    return NextResponse.json({msg : "Route is working" , lot , user} , {status:200})
}