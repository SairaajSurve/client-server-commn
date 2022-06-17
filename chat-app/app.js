console.log("FrontEnd Connected")

let namex = prompt('Enter Your Name');

const sock = new WebSocket("ws://localhost:5001");

sock.onopen = (event) => {
    console.log('Socket Connected Succesfully');
}

const btn = document.querySelector('.msgBtn');
const msgSend = document.querySelector('#msg');
const msgWindow = document.querySelector('.chat-window');

btn.addEventListener('click', (e) => {
    sock.send([namex, msgSend.value]);
    e.preventDefault();
})

sock.onmessage = (e) => {
    let Data = JSON.parse(e.data);
    let para = document.createElement('p');
    if (Data[0] == namex) {
        para.innerHTML = "You : " + Data[1];
        msgWindow.appendChild(para);
        msgSend.value = "";
    }
    else {
        para.innerHTML = Data[0] + " : " + Data[1];
        msgWindow.appendChild(para);
        msgSend.value = "";
    }
}