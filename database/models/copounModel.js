import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        required: true
    },
    expires:Date,
    discount: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const couponModel = mongoose.model('coupon', schema)