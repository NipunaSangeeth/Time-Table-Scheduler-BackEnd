const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const http = require("http");
const { Server } = require("socket.io"); // socket part

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Your client URL
    credentials: true, // Allow credentials
  })
);
app.use(express.json({ limit: "10mb" })); // Increase limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase limit as needed
app.use(cookieParser());

app.use("/api", router);

// web socket part
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User connected : ${socket.id}`);
  socket.on("send_message", (data) => {
    const currentDateTime = new Date();
    const messageWithDate = {
      message: data.message || "Avalability is updated",
      time: currentDateTime.toLocaleTimeString(),
      date: currentDateTime.toLocaleDateString(),
    };
    //Resive the message to clients
    socket.broadcast.emit("receive_message", messageWithDate);
  });

  // Request part
  socket.on("send_requestMSG", (data) => {
    const currentDateTimeRequest = new Date();
    const messageWithDateRequest = {
      message: data.message || "Request is updated",
      time: currentDateTimeRequest.toLocaleTimeString(),
      date: currentDateTimeRequest.toLocaleDateString(),
    };
    //resive the MSG(Rwquest) to the client
    socket.broadcast.emit("receive_MessageRequest", messageWithDateRequest);
  });

  //calander update
  socket.on("send_calander", (data) => {
    const currentDateTimecalander = new Date();
    const messageWithcalanderDateRequest = {
      message: data.message || "Calander is updated",
      time: currentDateTimecalander.toLocaleTimeString(),
      date: currentDateTimecalander.toLocaleDateString(),
    };
    //resive the MSG(Rwquest) to the client
    socket.broadcast.emit("receive_CalanderMsg", messageWithcalanderDateRequest);
  });

  // Disconnected client
  socket.on("disconnect", () => {
    // console.log(`User Disconnected : ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Soket io server part running");
});

const PORT = 8000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
