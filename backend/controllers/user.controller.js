import { User } from "../models/users.models.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import ApiError from "../apierror.js";
import ApiResponse from "../apiresponse.js";

/* ================= TOKEN GENERATION ================= */

const generateAccessRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

/* ================= REGISTER USER ================= */

const registerUser = async (req, res) => {
  const { username, password, tag } = req.body;

  if (!username || !password || !tag) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { tags: tag }],
  });

  if (existedUser) {
    throw new ApiError(400, "Username or tag already exists");
  }

  /* 🔥 FILE VALIDATION (important fix) */
  if (!req.file) {
    throw new ApiError(400, "Profile picture is required");
  }

  const profilePicPath = req.file.path;

  const uploadedImage = await uploadoncloudinary(profilePicPath);

  if (!uploadedImage?.url) {
    throw new ApiError(500, "Image upload failed");
  }

  const user = await User.create({
    username,
    password,
    tags: tag,
    ProfilePicture: uploadedImage.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } =
    await generateAccessRefreshToken(createdUser._id);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: createdUser,
        accessToken,
        refreshToken,
      },
      "User registered successfully"
    )
  );
};

/* ================= LOGIN USER ================= */

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.IsPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      "User logged in successfully"
    )
  );
};

/* ================= CURRENT USER ================= */

const getCurrentUser = async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "Current user fetched successfully")
  );
};

/* ================= UPDATE PROFILE PICTURE ================= */

const updateProfilePicture = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Profile picture is required");
  }

  const uploadedImage = await uploadoncloudinary(req.file.path);

  if (!uploadedImage?.url) {
    throw new ApiError(500, "Image upload failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { ProfilePicture: uploadedImage.url } },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, user, "Profile picture updated successfully")
  );
};

/* ================= GET USER PROFILE ================= */

const getUserprofile = async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is missing");
  }

  const userProfile = await User.findOne({ username }).select(
    "-password -refreshToken"
  );

  if (!userProfile) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, userProfile, "User profile fetched successfully")
  );
};

export {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfilePicture,
  getUserprofile,
};