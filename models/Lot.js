import mongoose  from "mongoose"

const LotSchema = new mongoose.Schema( {
    artistName : {
        type : String,
    },
    name : {
        type: String, 
        required : [true , "Lot name not provided"]
    },
    lotStatus : {
        type : String,
        enum : ["sold" , "unsold" , "ongoing"] ,
        default : "ongoing"
    },
    timeLeftBeforeKnockDown : {
        type : Number,
        default : 24
    },
    currentHighestBid : {
        type : Number
    },
    highestBidder : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        default: null,
    },
    retailPrice : {
        type:Number,
        required : [true , "Please provide retail price..."]
    },
    description : {
        type : String,
    },
    auctionHouseOfIssuance : {
        type : mongoose.Types.ObjectId,
        ref : "AuctionHouse",
        required : [true , "Auction House of Issuance not provided"]
    }
})

const LotModel = mongoose.models.Lot || mongoose.model("Lot" , LotSchema);

export default LotModel;