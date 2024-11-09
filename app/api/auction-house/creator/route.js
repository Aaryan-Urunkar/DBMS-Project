import User from "@/models/User"
import AuctionHouse from "@/models/AuctionHouse"
import { user } from "@nextui-org/react";
import { NextResponse } from "next/server";
import { connectToDB } from "@/mongoose/connectDB";

export async function GET(req , {params}){

    // const data = await req.json();

    connectToDB();

    const userId = req.headers.get("x-user-id");
    const userName = req.headers.get("x-user-name");

    const house= await AuctionHouse.findOne({createdBy : userId})

    const lots = await 

    console.log(house);
    return NextResponse.json({house} , {status : 200})
}
