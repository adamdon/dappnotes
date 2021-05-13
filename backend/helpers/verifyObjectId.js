import mongoose from "mongoose";

export default function (_id)
{
    console.log("call valid");

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        console.log("not valid");
        return false;
    }
    else
    {
        console.log("valid");
        return true;
    }
}