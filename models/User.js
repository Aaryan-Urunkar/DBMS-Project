import mongoose  from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
    },
    username: {
      type: String,
      required: [true, 'Please provide username'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid username',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 8,
    },
    role: {
      type:String,
      enum: ['buyer', 'consignor', 'auction house admin' , 'admin'],
      default: 'buyer',
    },
    totalBalance : { //For buyers
      type : Number,
      default : 0
    },
    totalEarnings : { //For consignors
      type : Number ,
      default : 0
    }
  })

  UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  UserSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }
  
  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }
  
  const model = mongoose.models.User || mongoose.model("User" ,UserSchema );
  export default model;