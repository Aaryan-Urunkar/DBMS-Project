import mongoose from "mongoose";

const AuctionHouseSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  name:{
    type:String,
    required:[true , "Please provide auction house name"]
  },
  fixedCommissionPercentage:{
    type:Number,
    required:[true , "Please provide fixed commission percentage of auction house"]
  },
  image:{
    type:"String",
    default:"https://thumbs.dreamstime.com/b/inside-auction-house-fasig-tipton-lexington-united-states-may-161317587.jpg"
  }
  ,
  totalEarnings : {
    type:Number,
    default:0
  }
});

const auctionHouseModel = mongoose.models.AuctionHouse || mongoose.model("AuctionHouse" , AuctionHouseSchema);

export default auctionHouseModel;
