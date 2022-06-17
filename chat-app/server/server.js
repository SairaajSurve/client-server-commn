const server = require('ws').Server;

const s = new server({ port: 5001 });

s.on('connection', (ws) => {
    console.log("Client Added")
    ws.on('close', () => {
        console.log("Client Lost")
    })
    ws.on('message', (data) => {
        let textArr = data.toString().split(',');
        let textJSON = JSON.stringify(textArr);
        s.clients.forEach((client) => {
            client.send(textJSON);
        })
    })
})