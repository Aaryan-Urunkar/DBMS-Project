import User from "@/models/User"
import AuctionHouse from "@/models/AuctionHouse"
import Lot from "@/models/Lot"
import { NextResponse } from "next/server";
import { connectToDB } from "@/mongoose/connectDB";

export async function POST(req){
    const data = await req.json();

    await connectToDB();

    
    const userId = req.headers.get("x-user-id");
    const userName = req.headers.get("x-user-name");

    const user = await User.findOne({_id : userId})
    console.log(user);
    

    console.log("Not In this loop");

    if( user._id ){
        console.log("In this loop");
        
        const house = await AuctionHouse.findOne({createdBy : user._id});
        console.log(house);

        const lots = await Lot.find({auctionHouseOfIssuance : house._id})

        lots.map(async(lot) => {
            await Lot.deleteOne({auctionHouseOfIssuance : house._id})
        })
        
        await AuctionHouse.deleteOne({_id : house._id})
        //await AuctionHouse.deleteOne({...house})
        await User.deleteOne({_id : userId})
        return NextResponse.json({msg:"Deleted house and admin successfully"} , {status : 200})
    }


    return NextResponse.json({msg:"Some error deleting auction house"} , {status : 400})
}