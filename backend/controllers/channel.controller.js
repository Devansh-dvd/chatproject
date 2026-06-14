import {Channel} from "../models/channels.models.js"
import { Message } from "../models/messages.models.js"
import { uploadoncloudinary } from "../utils/cloudinary.js"
import ApiError from "../apierror.js"
import ApiResponse from "../apiresponse.js" 
import { User } from "../models/users.models.js";
import { Alchan } from "../models/alchan.models.js";

export const createChannel = async (req, res) => {
  try {
   const { channelname: name, description, admin: adminId } = req.body;

   console.log(name, description, adminId);
   console.log("damnn");

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
      members: [adminId]
    });

    await User.findByIdAndUpdate(adminId, {
      $push: { channels: channel._id }
    });

await Alchan.findByIdAndUpdate(
  alchanId,
  {
    $push: { channelarray: channel._id }
  }
);

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

export const getChannelMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ channelId: id })
      .populate("senderId", "username ProfilePicture tags")
      .sort({ createdAt: 1 });

    return res.status(200).json(
      new ApiResponse(200, messages, "Messages retrieved successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to retrieve messages")
    );
  }
};
import { RequestStatus } from "../models/requests.models.js";  // ← add this import at top

// Search channels by name
export const searchChannels = async (req, res) => {
  try {
    const { name, userId } = req.query;

    const channels = await Channel.find({
      name: { $regex: name, $options: "i" }  // case insensitive search
    }).populate("adminId", "username ProfilePicture");

    // for each channel tell frontend if user is already a member or not
    const result = channels.map((channel) => ({
      ...channel.toObject(),
      isMember: channel.members.some(
        (memberId) => memberId.toString() === userId
      ),
    }));

    return res.status(200).json(
      new ApiResponse(200, result, "Channels fetched successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to search channels")
    );
  }
};

// Send join request
export const sendJoinRequest = async (req, res) => {
  try {
    const { userId, channelId } = req.body;

    // check if already a member
    const channel = await Channel.findById(channelId);
    if (channel.members.includes(userId)) {
      return res.status(400).json(
        new ApiError(400, "Already a member")
      );
    }

    // check if request already exists
    const existingRequest = await RequestStatus.findOne({ userId, channelId });
    if (existingRequest) {
      return res.status(400).json(
        new ApiError(400, "Request already sent")
      );
    }

    const request = await RequestStatus.create({
      userId,
      channelId,
      status: "pending"
    });

    return res.status(201).json(
      new ApiResponse(201, request, "Join request sent successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to send join request")
    );
  }
};

// Get pending requests for channel owner
export const getPendingRequests = async (req, res) => {
  try {
    const { adminId } = req.params;

    // find all channels owned by this admin
    const channels = await Channel.find({ adminId });
    const channelIds = channels.map((c) => c._id);

    // find all pending requests for those channels
    const requests = await RequestStatus.find({
      channelId: { $in: channelIds },
      status: "pending"
    })
      .populate("userId", "username ProfilePicture")
      .populate("channelId", "name profilePicture");

    return res.status(200).json(
      new ApiResponse(200, requests, "Pending requests fetched")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to fetch requests")
    );
  }
};

// Accept or reject request
export const handleJoinRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body; // action = "accepted" or "rejected"

    const request = await RequestStatus.findById(requestId);
    if (!request) {
      return res.status(404).json(new ApiError(404, "Request not found"));
    }

    request.status = action;
    await request.save();

    // if accepted add user to channel members
    if (action === "accepted") {
      await Channel.findByIdAndUpdate(request.channelId, {
        $push: { members: request.userId }
      });

      await User.findByIdAndUpdate(request.userId, {
        $push: { channels: request.channelId }
      });
    }

    return res.status(200).json(
      new ApiResponse(200, request, `Request ${action} successfully`)
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to handle request")
    );
  }
};