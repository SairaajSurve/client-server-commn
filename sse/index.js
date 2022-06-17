const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', async (req, res, next) => {
    return res.status(200).json({message: "Hello"})
})

app.get('/stream', (req, res, next) => {
    
    res.setHeader('Content-type', 'text/event-stream');

    send(res);
})

let i = 0;
const send = (res) => {
    
    // has to be write and of the format 'data: ' with two new lines
    console.log("here");
    res.write('data: '+ `${++i}: hello! from stream\n\n`);

    setTimeout(() => send(res), 1000);
}

app.listen(8080, () => {
    console.log("Listening on port 8080");
})