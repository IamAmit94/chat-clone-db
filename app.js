import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { corsOptions } from "./constants/config.js";

import userRoute from "./src/routes/user.routes.js";
import chatRoute from "./src/routes/chat.routes.js";
import adminRoute from "./src/routes/admin.routes.js";
import { createUser } from "./seeders/user.js";
import { createSingleChats } from "./seeders/chat.js";

dotenv.config({
  path: "./.env",
});


const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";
const userSocketIDs = new Map();
const onlineUsers = new Set();

connectDB();
// uncomment the below code for creating the dummyData
// createUser(10)// TO create the temp user
// createSingleChats(10)
// createGroupChats(10);
// createMessages(10);
// createMessagesInAChat('65fd8cc10a62aaea145843d5', 50)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

// Using Middlewares Here
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs };
