const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

io.on("connection", (socket) => {
  console.log("Taze ulanyjy catyldy:", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Ulanyjy ayryldy:", socket.id);
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Dosya yüklenemedi" });
  }

  const fileUrl = `http://216.250.13.54:3000/uploads/${req.file.filename}`;

  io.emit("fileUploaded", { filename: req.file.originalname, url: fileUrl });

  res.json({ fileUrl });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server ishleyar: http://216.250.13.54:3000");
});