
import {Channel} from "../models/channels.models.js"
import { uploadoncloudinary } from "../utils/cloudinary.js"
import ApiError from "../apierror.js"
import ApiResponse from "../apiresponse.js" 

export const createChannel = async (req, res) => {
  try {
   const { channelname: name, description, admin: adminId } = req.body;

    if (!name || !description || !adminId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

     if (!req.file) {
    throw new ApiError(400, "Profile picture is required");
  }

    const profilePicPath = req.file.path;

    const uploadedImage = await uploadoncloudinary(profilePicPath);

    if (!uploadedImage?.url) {
        throw new ApiError(500, "Image upload failed");
      }

    const channel = await Channel.create({
      name,
      description,
      profilePicture: uploadedImage.url,
      adminId,
    });

    return res.status(201).json(
      new ApiResponse(201, channel, "Channel created successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Channel creation failed")
    );
  }
};