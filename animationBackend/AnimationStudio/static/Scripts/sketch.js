let frames = []; // array to store each frame of the animation
let currentFrame = 0; // keep track of the current frame being edited
let addFrameButton;
let nextFrameButton;
let prevFrameButton;
let canvas;
let isDrawing = false;
let tool = "pencil";
let pencilSlider;
let eraserSlider;
let clearButton;
let playButton;
let isPlaying = false;
let speedSlider;
let intervalId;

let img;

function setup() {
  canvas = createCanvas(600, 400);
  canvas.elt.oncontextmenu = function () {
    return false;
  };
  background(255);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(stopDrawing);
  // create buttons for navigating through the frames
  addFrameButton = createButton("Add Frame");
  addFrameButton.mousePressed(addFrame);
  playButton = createButton("Play Animation");
  playButton.mousePressed(playAnimation);

  // create a speed slider
  speedSlider = createSlider(33, 1000, 1000, 1);
  speedSlider.style("width", "200px");

  nextFrameButton = createButton("Next Frame");
  nextFrameButton.mousePressed(nextFrame);
  prevFrameButton = createButton("Previous Frame");
  prevFrameButton.mousePressed(prevFrame);
  // create sliders for pencil and eraser
  pencilSlider = createSlider(1, 20, 10, 1);
  eraserSlider = createSlider(1, 60, 20, 2);

  clearButton = createButton("Clear Canvas");
  clearButton.mousePressed(clearCanvas);
}
function addFrame() {
  frames.push(get(0, 0, width, height)); // add current canvas as new frame
  currentFrame = frames.length - 1; // set current frame to the last added frame
  clear(); // clear the canvas
  background(255); // reset the background color
}
function nextFrame() {
  currentFrame = (currentFrame + 1) % frames.length;
  image(frames[currentFrame], 0, 0);
}

function prevFrame() {
  if (currentFrame > 0) {
    currentFrame--;
  } else {
    currentFrame = frames.length - 1;
  }
  clear();
  background(255);
  image(frames[currentFrame], 0, 0);
}
function playAnimation() {
  if (frames.length === 0) {
    return;
  }
  if (!isPlaying) {
    isPlaying = true;
    playButton.html("Stop Animation");
    intervalId = setInterval(nextFrame, speedSlider.value());
  } else {
    isPlaying = false;
    clearInterval(intervalId);
    playButton.html("Play Animation");
  }
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
  if (img != null) //checks if there is an encoaded image
  {
    image(img, 0, 0);
    img = null; //resets image
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    tool = "pencil";
  } else if (mouseButton === RIGHT) {
    tool = "eraser";
  }
}

function clearCanvas() {
  clear();
  background(255);
}



//----wills dev tools----
function EncodeCanvas() //converts current frame to base64 string
{
canvas.loadPixels();
Image64 = canvas.canvas.toDataURL();
//console.log(Image64);
console.log(Image64);
}


function loadEncodedImage() //converts base 64 to rendered image
{

imgData = document.getElementById('base64').value; //loads base 64 code
img = loadImage(imgData);
document.getElementById('base64').value = "";
}

