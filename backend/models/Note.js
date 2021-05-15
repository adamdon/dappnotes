import mongoose from "mongoose";


/**
 * @constructor Note
 */
const NoteSchema = new mongoose.Schema
(
    {
        dataUri:
            {
                type: String,
                required: true,
            },
        name:
            {
                type: String,
                required: true,
                default: "null",
            },
        date:
            {
                type: Date,
                default: Date.now,
            },
    }
);

export let Note = mongoose.model('note', NoteSchema);