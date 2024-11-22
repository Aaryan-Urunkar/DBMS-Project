import { NextResponse } from "next/server";
import Lot from "@/models/Lot";
import { connectToDB } from "@/mongoose/connectDB";

export async function GET(req) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ msg: "User ID not provided" }, { status: 400 });
  }

  await connectToDB();

  const lots = await Lot.find({ highestBidder: userId });

  return NextResponse.json({ lots }, { status: 200 });
}