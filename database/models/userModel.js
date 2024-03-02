import mongoose from "mongoose";
import bcrypt from "bcrypt"

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, "too short"],
    },
    email: {
      type: String,
      unique: [true, "email is required"],
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"},
    passwordChangedAt: Date,
    wishList: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    addresses: [{
      street:String,
      phone: String,
      city:String
    }]
  },
  { timestamps: true }
);
schema.pre("save", function () {
 if(this.password) this.password = bcrypt.hashSync(this.password,10);
});
schema.pre('findOneAndUpdate', function () {
 if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,10);
})




const userModel = mongoose.model("User", schema);
export default userModel;
