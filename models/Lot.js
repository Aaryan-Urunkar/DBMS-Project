import mongoose  from "mongoose"

const LotSchema = new mongoose.Schema( {
    artistName : {
        type : String,
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        required : true,
        ref:"User"
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
    },
    image : {
        type : String,
        default : "https://monalisa.org/wp-content/uploads/2013/10/The-%C3%94Earlier-Version%C3%95-as-the-portr-ait-of-Lisa-del-Giocondo_1021_html_m12df3fdd-1024x729.jpg"
    }
})

const LotModel = mongoose.models.Lot || mongoose.model("Lot" , LotSchema);

export default LotModel;