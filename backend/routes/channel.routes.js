import router from "express";
import {createChannel} from "../controllers/channel.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { getChannelById } from "../controllers/channel.controller.js";

const channelRouter = router();

channelRouter.route("/createchannel").post(
  upload.single("groupicon"),
  createChannel
);

channelRouter.route("/getchannel/:id").get(getChannelById);

export default channelRouter;