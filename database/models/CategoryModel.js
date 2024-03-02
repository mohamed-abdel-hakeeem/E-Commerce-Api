import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minlength: [2, 'too short'],
    
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    image: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

schema.post('init', function(doc) {
    doc.image = "http://localhost:8000/" + "uploads/" +doc.image
})
export const CategoryModel = mongoose.model('Category', schema)