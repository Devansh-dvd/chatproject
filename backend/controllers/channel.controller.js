import {Channel} from "../models/channels.models.js"
import { uploadoncloudinary } from "../utils/cloudinary.js"
import ApiError from "../apierror.js"
import ApiResponse from "../apiresponse.js" 
import { User } from "../models/users.models.js";

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

    // Update the admin user's channels array
    await User.findByIdAndUpdate(adminId, {
      $push: { channels: channel._id }
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

export const getChannelById = async (req, res) => {
  try {
    const channelId = req.params.id;
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json(
        new ApiError(404, "Channel not found")
      );
    }
    return res.status(200).json(
      new ApiResponse(200, channel, "Channel retrieved successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to retrieve channel")
    );
  } 
};