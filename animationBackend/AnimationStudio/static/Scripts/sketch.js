let frames = []; // array to store each frame of the animation
let currentFrame; // keep track of the current frame being edited
let addFrameButton;
let nextFrameButton;
let prevFrameButton;
let canvas;
let isDrawing = false;
let pencilSlider;
let eraserSlider;
let clearButton;
let playButton;
let isPlaying = false;
let speedSlider;
let intervalId;
let deleteFrameButton;
let carouselDiv = document.getElementById("carousel");
let imgElement = document.createElement("img");
let images = document.querySelectorAll("img[data-index]");
function setup() {
  setInterval(updateDomImage, 0);
  canvas = createCanvas(900, 500);
  canvas.elt.oncontextmenu = function () {
    return false;
  };
  background(255, 255, 255, 0);
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
  deleteFrameButton = createButton("Delete Frame");
  deleteFrameButton.mousePressed(deleteFrame);
  frames.push(get(0, 0, width, height)); // add current canvas as new frame
  currentFrame = frames.length - 1; //sets index to 0
  imgElement = document.createElement("img");
  imgElement.src = frames[currentFrame].canvas.toDataURL();
  carouselDiv.appendChild(imgElement);
  imgElement.setAttribute("data-index", currentFrame);
  imgElement.classList.add("current-frame");
}
function draw() {
  if (isDrawing && mouseButton === LEFT) {
    stroke(0);
    strokeWeight(pencilSlider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  } else if (isDrawing && mouseButton === RIGHT) {
    strokeWeight(eraserSlider.value());
    erase();
    smooth();
    line(mouseX, mouseY, pmouseX, pmouseY);
    noErase();
  }

  frames[currentFrame] = get(0, 0, width, height);
  image(frames[currentFrame], 0, 0);
}

function updateDomImage() {
  //update the data-index attribute of each img element
  images.forEach((el, index) => el.setAttribute("data-index", index));
  //update the images variable to get the most updated images
  images = document.querySelectorAll("img[data-index]");
  //check if the currentFrame image exists
  if (document.querySelector(`img[data-index="${currentFrame}"]`)) {
    document.querySelector(`img[data-index="${currentFrame}"]`).src =
      frames[currentFrame].canvas.toDataURL();
  }
}

function addFrame() {
  frames.push(get(0, 0, width, height)); // add current canvas as new frame
  document
    .querySelector(`img[data-index="${currentFrame}"]`)
    .classList.remove("current-frame");
  currentFrame = frames.length - 1;
  clear(); // clear the canvas
  background(255, 255, 255, 0); // reset the background color
  imgElement = document.createElement("img");
  imgElement.setAttribute("data-index", currentFrame);
  imgElement.src = frames[currentFrame].canvas.toDataURL();
  carouselDiv.appendChild(imgElement);
  document
    .querySelector(`img[data-index="${currentFrame}"]`)
    .classList.add("current-frame");
  carouselDiv.scrollLeft = carouselDiv.scrollWidth; // scroll to the far right after a frame is added
  images = document.querySelectorAll("img[data-index]");
  images.forEach((el) => {
    el.addEventListener("click", function () {
      currentFrame = parseInt(this.getAttribute("data-index"));
      images.forEach((img) => img.classList.remove("current-frame"));
      this.classList.add("current-frame");
      clear();
      image(frames[currentFrame], 0, 0);
      updateDomImage();
    });
  });
}

function nextFrame() {
  clear();
  document
    .querySelector(`img[data-index="${currentFrame}"]`)
    .classList.remove("current-frame");
  currentFrame = (currentFrame + 1) % frames.length;
  document
    .querySelector(`img[data-index="${currentFrame}"]`)
    .classList.add("current-frame");
  image(frames[currentFrame], 0, 0);
}

function prevFrame() {
  document
    .querySelector(`img[data-index="${currentFrame}"]`)
    .classList.remove("current-frame");
  currentFrame = currentFrame > 0 ? currentFrame - 1 : frames.length - 1;
  document
    .querySelector(`img[data-index="${currentFrame}"]`)
    .classList.add("current-frame");
  clear();
  background(255, 255, 255, 0);
  image(frames[currentFrame], 0, 0);
}
function deleteFrame() {
  clear();
  if (frames.length > 1) {
    let temp = currentFrame;
    frames.splice(currentFrame, 1);
    document.querySelector(`img[data-index="${temp}"]`).remove();
    currentFrame--;
    if (currentFrame < 0) {
      currentFrame = 0;
    }
    document
      .querySelector(`img[data-index="${currentFrame}"]`)
      .classList.add("current-frame");
    image(frames[currentFrame], 0, 0);
  }
}

function playAnimation() {
  if (frames.length === 0) {
    return;
  }
  if (!isPlaying) {
    isPlaying = true;
    playButton.html("Stop Animation");
    intervalId = setInterval(nextFrame, speedSlider.value());
    tracingCanvas.canvas.style = "display: none";
    canvas.elt.style = "cursor: not-allowed";
    canvas.elt.style = "pointer-events: none";
  } else {
    isPlaying = false;
    clearInterval(intervalId);
    playButton.html("Play Animation");
    tracingCanvas.canvas.style = "display: block";
    canvas.elt.style = "cursor: initial";
    canvas.elt.style = "pointer-events: auto";
  }
}

function startDrawing() {
  isDrawing = true;
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  clear();
  background(255, 255, 255, 0);
}
sketch = function (p) {
  p.setup = function () {
    p.createCanvas(900, 500);
  };
  p.draw = function () {
    if (currentFrame > 0) {
      p.clear();
      p.image(frames[currentFrame - 1], 0, 0);
    } else {
      p.clear();
    }
  };
};
let tracingCanvas = new p5(sketch);

function saveData() 
{
  formTitle = document.getElementById('Form_Frame');
  formFRID = document.getElementById('Form_FRID');

  
  for (let i = 0; i < frames.length; i++) 
  { 
    frameData += `{"frame":"${frames[i].canvas.toDataURL()}"},`;
  }

  formFRID.value = "112"
  
  formTitle.value = frameData;
  document.getElementById('saveForm').submit();
}



  let frameData // outer JSON layer