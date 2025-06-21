import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db.js";
import User from "./models/User.js";

dotenv.config();


connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageInCloudinary = (buffer, fileName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: `${Date.now()}_${fileName}`,
          folder: "users_upload",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};

//  POST: Register new user
app.post("/api/user/create", upload.single("image"), async (req, res) => {
  try {
    const requiredFields = [
      "country",
      "city",
      "course",
      "proficiency",
      "fullName",
      "fatherName",
      "email",
      "phone",
      "cnic",
      "dateOfBirth",
      "gender",
      "address",
      "lastQualification",
      "hasLaptop",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ success: false, message: `${field} is required` });
      }
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const imageResult = await uploadImageInCloudinary(req.file.buffer, req.file.originalname);

    // Create user in MongoDB
    const newUser = await User.create({
      ...req.body,
      pictureUrl: imageResult.secure_url,
      picturePublicId: imageResult.public_id,
    });

    res.status(200).json({
      success: true,
      message: "Registration Submitted Successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in /api/user/create:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// ✅ GET: Fetch user by CNIC
app.get("/api/user/:cnic", async (req, res) => {
  try {
    const { cnic } = req.params;
    const user = await User.findOne({ cnic });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found for this CNIC" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error in /api/user/:cnic", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Hello brother");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
