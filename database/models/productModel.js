import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minlength: [2, 'too short product title'],
        maxlength: [200, 'too long product title'],
    },
    // slug: {
    //     type: String,
    //     lowercase: true,
    //     required: true,
    // },
    imgcover: String,
    images: [],
    description: {
        type: String,
        trim: true,
        required: true,
        minlength: [10, 'too short product description'],
        maxlength: [500, 'too long product description'],
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default:0
    },
    sold: Number,
    rate: {
        type: Number,
        max: 5,
        min:0
    },
    rateCount: {
        type: Number,
        default: 0,
        min:0
    } ,
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    barnd: {
        type: mongoose.Types.ObjectId,
        ref: 'Brand'
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, toJSON: { virtuals: true } });

schema.post('init', function (doc) {
    if(doc.imgcover || doc.images)
    doc.imgcover = "http://localhost:8000/" + "uploads/" + doc.imgcover
    doc.images = doc.images?.map(image => "http://localhost:8000/" + "uploads/" + image)
})

schema.virtual('myreviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
})

schema.pre('findOne', function() {
    this.populate('myreviews', 'name')
})

export const ProductModel = mongoose.model('Product', schema)