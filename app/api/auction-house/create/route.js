import AuctionHouse from "@/models/AuctionHouse";
import User from "@/models/User.js"
import { connectToDB } from "@/mongoose/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();

    const userId = req.headers.get("x-user-id");
    const userName = req.headers.get("x-user-name")
    
    // console.log(req);
    // Read the body safely
    let data;
    try {
        data = await req.json();
    } catch (error) {
        console.error("Error parsing JSON body:", error);
        return NextResponse.json({ error: "Invalid or missing JSON in request body" }, { status: 400 });
    }

    const user = await User.findOneAndUpdate({
        _id : userId,
        name: userName,
    }, {
        role: "auction house admin"
    },
        { new: true, runValidators: true }
    )

    const newHouse = await AuctionHouse.create({
        name : data.auctionHouseName,
        image : data.auctionHouseImage,
        fixedCommissionPercentage : data.fixedCommissionPercentage,
        createdBy : userId
    });

    return NextResponse.json({message:'New auction house added' }, {status:200 });
}