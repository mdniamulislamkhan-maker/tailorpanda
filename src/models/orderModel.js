const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tailor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gig: { type: mongoose.Schema.Types.ObjectId, ref: "TailorGig", required: true },
    status: { type: String, enum: ["pending", "in-progress", "completed", "cancelled"], default: "pending" },

    orderDetails: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    totalPrice: { type: Number },
    customerNote: { type: String },
    tailorNote: { type: String },


}, { timestamps: true })

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);