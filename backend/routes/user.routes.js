import {Router} from 'express';
import {registerUser, loginUser, getCurrentUser, updateProfilePicture, getUserprofile}from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

router.post("/registeruser", 
  upload.single("profilePic"),
  registerUser
);

router.route("/loginuser").post(loginUser);

router.post("/currentuser", getCurrentUser);

router.route("/updateprofilepicture").put(updateProfilePicture);

router.route("/profile/:username").get(getUserprofile);

export default router;