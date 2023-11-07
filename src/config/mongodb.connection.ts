import mongoose from "mongoose";

class MongoDB {

    MONGODB_URL : string;
    constructor () {
        // this.MONGODB_URL = "mongodb+srv://dassibasishdas:bFlnhMCuW7huM0sk@cluster0.ss6mjmw.mongodb.net/movies"; 
        this.MONGODB_URL = "mongodb://localhost:27017/"; 
    }
    
    async connect() {
        try{
        let mongoConnect = await mongoose.connect(this.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    
        console.log("Mongodb connected");
    
    }catch(e){
        console.log("Mongodb error");
        setTimeout( async () => {
            console.log("Retrying after error");
            await this.connect()
        },1000)
    }
    }
}

export const mongoDB = new MongoDB();
