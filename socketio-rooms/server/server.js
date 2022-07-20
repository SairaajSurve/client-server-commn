const express = require('express')
const socket = require('socket.io')
const cors = require('cors')

const app = express()

app.use(cors())
app.get('/', async (req, res, next) => {
    return res.status(200).json({'message': "Connected"})
})

const server = app.listen(5000, () => {
    console.log("Listening at port 5000")
})

let users = []
let messages = {
    general: [],
    random: [],
    jokes: [],
    javascript: [],
}

const socketConnect = (socket) => {
    console.log(`Socket Connected: ${socket.id}`)

    socket.on('join server', (username) => {
        const user = {
            username: username,
            id: socket.id
        }
        users.push(user)
        io.emit('new user', users)
    })

    socket.on('join room', (roomName, callback) => {
        socket.join(roomName)
        callback(messages[roomName])
    })

    socket.on('send message', ({ content, to, sender, chatName, isChannel }) => {
        if (isChannel) {
            const payload = {
                content: content,
                chatName: chatName,
                sender: sender
            }
            socket.to(to).emit('new message', payload)
        } else {
            const payload = {
                content: content,
                chatName: sender,
                sender: sender
            }
            socket.to(to).emit('new message', payload)
        }
        if (messages[chatName]) {
            messages[chatName].push({
                sender: sender,
                content: content,
            })
        }
    })

    socket.on('disconnect', () => {
        users = users.filter((user) => {
            return user.id !== socket.id
        })
        io.emit('new user', users)
    })
}

const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


io.on('connection', socketConnect)