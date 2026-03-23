import router from "express";
import {createChannel} from "../controllers/channel.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const channelRouter = router();

channelRouter.route("/createchannel").post(
  upload.single("groupicon"),
  createChannel
);

// channelRouter.route("/getchannels").get(getChannels);
// channelRouter.route("/getchannel/:id").get(getChannelById);

export default channelRouter;