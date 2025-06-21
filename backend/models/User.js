import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  country: String,
  city: String,
  course: String,
  proficiency: String,
  fullName: String,
  fatherName: String,
  email: String,
  phone: String,
  cnic: String,
  fatherCnic: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  lastQualification: String,
  hasLaptop: String,
  pictureUrl: String,
  picturePublicId: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  termsAccepted: Boolean,
  termsAcceptedAt: Date,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
