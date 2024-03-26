import express from "express";
import { isAuthenticated } from "../../middlewares/auth.js";
import {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getMessages,
  getChatDetails,
  renameGroup,
  deleteChat,
} from "../controllers/chat.controller.js";

import { attachmentsMulter } from "../../middlewares/multer.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup);

//send Attachments
app.post("/message", attachmentsMulter, sendAttachments);

// Get Messages
app.get("/message/:id", getMessages);

// Get Chat Details, rename,delete
app
  .route("/:id")
  .get(getChatDetails)
  .put(renameGroup)
  .delete(deleteChat);

export default app;
