import { NextResponse } from 'next/server';
import Lot from "@/models/Lot"
import User from "@/models/User"
import { connectToDB } from '@/mongoose/connectDB';

export async function POST(req) {
  try {
    await connectToDB(); // Connect to MongoDB

    const data = await req.json(); // Parse JSON from the request body
    
    const userId = req.headers.get("x-user-id");
    const userName = req.headers.get("x-user-name");

    const user = await User.findOne({_id : userId , name : userName})
    console.log(user);
    
    if(!user || user.role !== "consignor"){
        return NextResponse.json({message : "Invalid user or invalid user role"} , {status : 500});
    }

    const newLot = await Lot.create(data);
 
    return NextResponse.json({ message: 'Lot added successfully' , newLot }, { status: 201 });
  } catch (error) {
    console.error('Error adding lot:', error);
    return NextResponse.json({ error: 'Failed to add lot' }, { status: 500 });
  }
}