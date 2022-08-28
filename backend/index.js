const express = require('express');
const app = express();
const http = require('http');
const cors = require("cors")
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: "https://harmonious-choux-39e014.netlify.app" });
const mongoose = require('mongoose');
const Room = require('./models/room');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: 'https://harmonious-choux-39e014.netlify.app',
    credentials: true,
}))

app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/rooms", async (req, res) => {
    const rooms = await Room.find({})
    res.send(rooms)
})

app.get("/rooms/:id/messages", async (req, res) => {
    const room_id = req.params.id
    const messages = await Room.findById(room_id, { _id: 0, messages: 1 }).exec()
    res.send(messages)
})

app.get("/rooms/:id", async (req, res) => {
    try {
        await Room.findById(req.params.id);
        res.sendStatus(200)
    }
    catch {
        return res.sendStatus(404)
    }
})

app.post("/create_room", async (req, res, cb) => {
    const { title, description, grade, subject } = req.body
    const room = new Room({ title, description, grade, subject })
    room.save((err) => {
        if (err) {
            cb(err, null)
            return
        }
    })
    io.sockets.emit("room created", { title, description, grade, subject })
    io.emit("url_created", `../rooms/${room.id}`)
})

io.on("connection", (socket) => {
    socket.on("join room", (room) => socket.join(room))
    socket.on("message sent", (room, message) => {
        Room.updateOne({ _id: room }, { $push: { messages: message } }, {}, (err) => {
            if (err) {
                console.log(err)
            }
        });
        io.sockets.in(room).emit("message recieved", message)
    })
})

server.listen(process.env.PORT || 5000, () => {
    console.log('listening on *:5000');
});

