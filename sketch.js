let canvas;
let isDrawing = false;
let tool = "pencil";
let pencilSlider;
let eraserSlider;

function setup() {
    canvas = createCanvas(600, 400);
    canvas.elt.oncontextmenu = function() { return false; };
    background(255);
    canvas.mousePressed(startDrawing);
    canvas.mouseReleased(stopDrawing);

    // create sliders for pencil and eraser
    pencilSlider = createSlider(1, 10, 2, 1);
    eraserSlider = createSlider(1, 60, 20, 2);
}

function startDrawing() {
    isDrawing = true;
}

function stopDrawing() {
    isDrawing = false;
}

function draw() {
    if (isDrawing) {
        if (tool === "pencil") {
            stroke(0);
            strokeWeight(pencilSlider.value());
        } else if (tool === "eraser") {
            stroke(255);
            strokeWeight(eraserSlider.value());
        }
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        tool = "pencil";
    } else if (mouseButton === RIGHT) {
        tool = "eraser";
    }
}
