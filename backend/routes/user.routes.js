import {Router} from 'express';
import {registerUser, loginUser, getCurrentUser, updateProfilePicture, getUserprofile}from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.js';

const router = Router();

router.route("/registeruser").post(upload.fields([
    {name: "profilePic", maxCount: 1},
]), registerUser);

router.route("/loginuser").post(loginUser);

router.route("/currentuser").get(getCurrentUser);

router.route("/updateprofilepicture").put(updateProfilePicture);

router.route("/profile/:username").get(getUserprofile);

export default router;