import mongoose from "mongoose";


export class Database
{
    constructor() {    }

    static isConnected = false;

    static async connect()
    {
        try
        {
            console.log("[mongoose] connecting...")

            mongoose.set('useNewUrlParser', true);
            mongoose.set('useUnifiedTopology', true);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useFindAndModify', false);
            await mongoose.connect(process.env.MONGO_URI, null, null );
            this.isConnected = true;
            console.log("[mongoose] ...connected")
        }
        catch (error)
        {
            console.error(error.message);
            // process.exit(1);  //exit run and fail
        }
    }

}

