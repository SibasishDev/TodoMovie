import mongoose , {Schema,Model,Document, Types} from "mongoose";


interface IMovie extends Document {
    title : string,
    genre : string,
    rating : number,
    streamingLink : string,
    // user : Types.ObjectId,
    createdAt : Date
}

const movieSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    genre : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        require : true
    },
    streamingLink : {
        type  : String,
        required : true,
    },
    // user : {
    //     type : mongoose.Types.ObjectId,
    //     ref : "User"
    // },
    createdAt : {
        type : String,
        default : Date.now()
    }
});

movieSchema.index({title : 1, genre : 1});

export const Movie : Model<IMovie> = mongoose.model<IMovie>("Movie",movieSchema);