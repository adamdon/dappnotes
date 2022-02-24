import mongoose from "mongoose";


/**
 * @constructor Note
 */
const NoteSchema = new mongoose.Schema
(
    {
        name:
            {
                type: String,
                required: true,
                default: "null",
            },
        imageIpfsHash:
            {
                type: String,
                required: true,
            },
        imageUri:
            {
                type: String,
                required: true,
            },
    }
);

export let Note = mongoose.model('note', NoteSchema);