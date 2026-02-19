import {Router} from 'express';
import {registerUser} from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(upload.fields([
    {name: "ProfilePicture", maxCount: 1},
]), registerUser);

export default router;