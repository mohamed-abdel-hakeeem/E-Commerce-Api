import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'too short'],
        trim: true,
        required: true,
        minlength: [2, 'too short'],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    logo: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

schema.post('init', function(doc) {
    doc.logo = "http://localhost:8000/" + "uploads/" +doc.logo
})

export const BrandModel = mongoose.model('Brand', schema)