import mongoose, { Schema, Model, Document } from "mongoose";

interface IUser extends Document{
    email : string,
    name : string,
    role : number,
    password : string
}

const userSchema = new Schema<IUser>({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    role : {
        type : Number,
        enum : [1,2,3],
        default : "user",
    },
    password : {
        type : String,
        required : true
    }

})

export const User : Model<IUser> = mongoose.model<IUser>("User",userSchema);