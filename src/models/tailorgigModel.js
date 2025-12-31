import mongoose from "mongoose";


const TailorGigSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        deliveryTime: { type: Number, required: true }, // in days
        revisions: { type: Number, required: true },
        tailor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true
    }
)
export default mongoose.models.TailorGig || mongoose.model("TailorGig", TailorGigSchema);