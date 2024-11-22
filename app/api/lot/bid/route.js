import { NextResponse } from "next/server";
import Lot from "@/models/Lot";
import User from "@/models/User";
import { connectToDB } from "@/mongoose/connectDB";

export async function POST(req) {
    try {
        await connectToDB();


        const userId = req.headers.get('x-user-id');
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        const { lotId, bidAmount } = await req.json();
        if (!lotId || !bidAmount) {
            return NextResponse.json({ msg: "Missing lotId or bidAmount" }, { status: 400 });
        }

        const lot = await Lot.findById(lotId);
        if (!lot) {
            return NextResponse.json({ msg: "Lot not found" }, { status: 404 });
        }

        if (bidAmount <= (lot.currentHighestBid || 0)) {
            return NextResponse.json({ msg: "Bid amount must be higher than the current highest bid" }, { status: 400 });
        }

        if(bidAmount < lot.retailPrice) {
            return NextResponse.json({ msg: "Bid amount must be higher than the retail price" }, { status: 400 });

        }

        if (lot.highestBidder && lot.highestBidder.toString() === userId) {
            return NextResponse.json({ msg: "You are already the highest bidder" }, { status: 400 });
        }

        // Update the lot with the new highest bid
        lot.currentHighestBid = bidAmount;
        lot.highestBidder = userId;
        await lot.save();

        return NextResponse.json({ msg: "Bid placed successfully", lot }, { status: 200 });

    } catch (error) {
        console.error("Error placing bid:", error);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}