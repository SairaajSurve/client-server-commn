console.log("server.js is running")

const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(3000)

app.use(express.static('public'));


const io = socket(server);

io.sockets.on('connection',newConnection);

function newConnection(socket){
    console.log("New Client : "+socket.id);
    socket.on('mouse',mouseMsg);
    function mouseMsg(data){
        socket.broadcast.emit('mouse',data) // This is a specfic socket
        // io.sockets.broadcast.emit('mouse',data) // Emits to all 
    }
}