import mongoose from "mongoose";

const alchanSchema = new mongoose.Schema(
    {
        channelarray: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Channel",
            default: [] 
    }   
},
{timestamps: true}
);

export const Alchan = mongoose.model("Alchan", alchanSchema);