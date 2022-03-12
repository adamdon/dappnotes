import mongoose from "mongoose";


export class database
{
    constructor() {    }

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

            console.log("[mongoose] ...connected")
        }
        catch (error)
        {
            console.error(error.message);
            // process.exit(1);  //exit run and fail
        }
    }

}

