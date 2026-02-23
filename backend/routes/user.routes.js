import {Router} from 'express';
import {registerUser, loginUser, getCurrentUser, updateProfilePicture, getUserprofile}from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(upload.fields([
    {name: "ProfilePicture", maxCount: 1},
]), registerUser);

router.route("/login").post(loginUser);

router.route("/currentuser").get(getCurrentUser);

router.route("/updateprofilepicture").put(updateProfilePicture);

router.route("/profile/:username").get(getUserprofile);

export default router;