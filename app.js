const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Taze ulanyjy baglandy:", socket.id);

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("Ulanyjy ayryldy:", socket.id);
  });
});

server.listen(3000, '192.168.1.7', () => {
  console.log("Server running: http://192.168.1.7:3000");
});
