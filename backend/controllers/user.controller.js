import {User} from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { uploadoncloudinary } from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateaccessrefreshToken = async (userid) =>{
    try{
    const user = await User.findById(userid);
    const accesstoken = user.generateAccessToken();       
     const refreshtoken = user.generateRefreshToken();   

    user.refreshToken = refreshtoken;

    await user.save({validateBeforeSave: false});

    return {accesstoken , refreshtoken};
    }
    catch(error){
        console.log("Error generating tokens:", error);
        throw error;
    }
}

const registerUser = async (req, res) =>{

        const {username, password, tags} = req.body;
        
        const existedUser = await User.findOne({
        $or: [{ username },{ tags }]
    })

    if(existedUser){
        return res.status(400).json({
            success: false,
            message: "Username or tags already exists"
        })
    }

    const ProfilePicturepath = req.files.ProfilePicture[0].path;

    const profilepic = await uploadoncloudinary(ProfilePicturepath);
    
    const user = await User.create({
        username,
        password,
        tags,
        profilepic: profilepic?.url || ""
    })

    const createduser = await User.findById(user._id).select("-password -refreshToken");

    if(!createduser){
        throw new ApiError(500,"User creation failed")
    }
    else{
const { accessToken, refreshToken } =
    await generateaccessrefreshToken(createduser._id);

return res.status(201).json(
    new ApiResponse(
        200,
        {
            user: createduser,
            accessToken,
            refreshToken
        },
        "User registered successfully"
    )
)}}

const loginUser = (async (req, res) =>{
    const {username, password} = req.body

    const user = await User.findOne({username})

     if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateaccessrefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
})

 const getCurrentUser = async(req, res) =>{
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully"
        )
    )
 }

 const updateProfilePicture = async (req, res) =>{
    const profilepicpath = req.file?.path;
    if(!profilepicpath){
        throw new ApiError(400, "Profile picture is required")
 }
    const profilepic = await uploadoncloudinary(profilepicpath);
    if(!profilepic.url){
        throw new ApiError(500, "Failed to upload profile picture")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                ProfilePicture: profilepic.url
            }
        },
        { new: true }
    ).select("-password");

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Profile picture updated successfully"
        )
    )}

    const getUserprofile = async (req, res) =>{
        const{username} = req.params;

         if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const userprofile = await User.findOne({username}).select("-password -refreshToken");

    if(!userprofile){
        throw new ApiError(404, "User not found")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            userprofile,
            "User profile fetched successfully"
        )
    )
}

export{registerUser, loginUser, getCurrentUser, updateProfilePicture, getUserprofile}
