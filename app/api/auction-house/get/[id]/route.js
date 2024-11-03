import { NextResponse } from "next/server";
import AuctionHouse from "@/models/AuctionHouse";
export async function GET(req , {params}) {

    const {id} = await params
    console.log(id)


    const auctionHouse = await AuctionHouse.findOne({_id : id})
    console.log(auctionHouse);
    

    return NextResponse.json({msg:"Route is working" , name:auctionHouse.name} , {status:200})
}