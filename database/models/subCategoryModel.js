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
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

schema.pre('find', function() {
    this.populate('category')
})

export const subCategoryModel = mongoose.model('subCategory', schema)