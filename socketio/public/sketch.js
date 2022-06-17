var socket;

function setup() {
    createCanvas(1000, 1000);
    socket = io.connect('http://localhost:3000/');

    socket.on('mouse',newDrawing);
}

function newDrawing(data){
    ellipse(data.x,data.y, 80, 80);
    fill('red');
    noStroke();
}

function draw() {

    if (mouseIsPressed) {
        const data = {
            x : mouseX,
            y : mouseY
        }
        ellipse(data.x,data.y, 80, 80);
        fill(255);
        socket.emit('mouse',data); // 'mouse' is the name of the message and NOT event
    }
    else {  
    }
    noStroke();

}