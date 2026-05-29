import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Log = mongoose.model("Log", logSchema);

export default Log;