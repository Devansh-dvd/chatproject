import {User} from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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


}

