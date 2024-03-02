import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true,
        minlength: [2, 'too short'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    rate: {
        type: Number,
        required: true,
        min: 0,
        max:5
    }
}, { timestamps: true });
schema.pre(/^find/, function() {
    this.populate('user', 'name')
})

export const reviewModel = mongoose.model('Review', schema)