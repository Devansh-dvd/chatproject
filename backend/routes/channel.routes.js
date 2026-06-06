import { Router } from "express";
import { createChannel, getChannelById, getChannelMessages } from "../controllers/channel.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const channelRouter = Router();

channelRouter.route("/createchannel").post(
  upload.single("groupicon"),
  createChannel
);

channelRouter.route("/getchannel/:id").get(getChannelById);
channelRouter.route("/messages/:id").get(getChannelMessages);

export default channelRouter;