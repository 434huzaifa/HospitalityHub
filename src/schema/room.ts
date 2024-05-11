import { Schema, model } from "mongoose";

const roomSchema=new Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        unique:true
    },
    capacity:{
        type:Number,
        required: true,
        trim: true,
    },
    isAc:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

export const Room = model("Room",roomSchema)