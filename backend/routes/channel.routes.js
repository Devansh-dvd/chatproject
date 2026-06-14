import { Router } from "express";
import {
  createChannel,
  getChannelById,
  getChannelMessages,
  searchChannels,        
  sendJoinRequest,       
  getPendingRequests, 
  handleJoinRequest, 
} from "../controllers/channel.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const channelRouter = Router();

channelRouter.route("/createchannel").post(
  upload.single("groupicon"),
  createChannel
);

channelRouter.route("/getchannel/:id").get(getChannelById);
channelRouter.route("/messages/:id").get(getChannelMessages);
channelRouter.route("/search").get(searchChannels);                    
channelRouter.route("/joinrequest").post(sendJoinRequest);               
channelRouter.route("/pendingrequests/:adminId").get(getPendingRequests); 
channelRouter.route("/handlerequest").post(handleJoinRequest);          

export default channelRouter;