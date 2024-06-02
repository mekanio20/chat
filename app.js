const cors = require('cors')
const express = require('express')
const socket = require('socket.io')
const port = 5050
const ip = '192.168.248.172'
const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = app.listen(port, ip, () => {
    console.log(`Server is running: http://${ip}:${port}`);
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })
})