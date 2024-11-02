import mongoose from "mongoose";
import AuctionHouse from "@/models/AuctionHouse";
import { connectToDB } from "@/mongoose/connectDB";
import { NextResponse } from "next/server";


export async function GET(req , { params }){
    await connectToDB();
    

    const allAuctionHouses = await AuctionHouse.find({});
    if(!allAuctionHouses){
        return NextResponse.json({msg : "Unable to retreive auction houses"} , {status:404})
    }

    // console.log(allAuctionHouses);
    return NextResponse.json({allAuctionHouses} , {status : 200});
}