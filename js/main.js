// Basic App

const sock = new WebSocket("ws://localhost:5001");

sock.onopen = (event) =>{
    console.log('Socket Connected Succesfully');
}

const button = document.querySelector('button');
const input = document.querySelector('input');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopPropagation();
    let x = input.value;
    sock.send(x);
    console.log("Hello");
})

sock.onmessage = ()=>{
    console.log('Message Sent');
}