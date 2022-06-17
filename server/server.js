// Basic App

const server = require('ws').Server;

const s = new server({ port: 5001 });

const fs = require('fs');

s.on('connection',(ws) => {
    console.log("Connected");
    ws.on('message', (data) => {
        console.log(data.toString());
        main(data.toString());
    })
    ws.send('Hi from server');
    ws.on('close', () => {
        console.log("Disconnected");
    })
})


const main = (data) => {
    fs.readFile('../Basic.csv',  (err,Text) => {
        if (Text.length == 0) {
            fs.appendFileSync('../Basic.csv', data)
        }
        else{
            fs.appendFileSync('../Basic.csv',","+data)
        }
    })
}