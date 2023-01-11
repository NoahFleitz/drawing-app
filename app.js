//select canvas html tag
const canvas = document.getElementById("canvas1");
//set context in variable ctx
const ctx = canvas.getContext("2d");
//set hue variable
let hue = 0;
//set the canvas height and width to CURRENT window size
canvas.width = 600; 
canvas.height = 480;
//trigger change height and width every time the window is resized
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
})

//creates mouse object with  empty x, y values and a "clicked" status
const mouse = {
    x: undefined,
    y: undefined,
    clicked: false,
}

//triggers event each time the mouse is clicked
canvas.addEventListener('mousedown', function(event){
    //assigns click event coordinates to mouse object coordinates making it globally available then executes drawCircle() and changes "clicked" status to true
    mouse.x = event.x;
    mouse.y = event.y;
    drawCircle();
    mouse.clicked = true;
});

//changes coordinates to mouse move event coordinates and executes drawCircle() over and over  only while the "clicked" status is true
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    if(mouse.clicked){
        drawCircle();
    }
});

// changes "clicked" status to false once mouse button is released 
canvas.addEventListener('mouseup', function(event){
    mouse.clicked = false;
});

//draws circle in canvas at current mouse object coordinates
function drawCircle(){
    ctx.fillStyle = 'hsl(' + hue + ", 100%, 50%)";
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 15,0, Math.PI * 2);
    ctx.fill();
    hue++;
}
