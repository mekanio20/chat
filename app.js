const express = require('express')
const socket = require('socket.io')
const port = 5000
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`);
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })
})