//Devloped by William Powers
//Last Updated: 02/27/2023
//This code works with the back end to save and load users animations
loadedFrame  = false;

//saves animation to server
function saveData() 
{
  let frameData // outer JSON layer
  formTitle = document.getElementById('Form_Frame');
  frameData = '{"frame":';
  
  for (let i = 0; i < frames.length; i++) 
  { 
    frameData += `{"frame":"${frames[i].canvas.toDataURL()}"},`;
  }
  
  
  formTitle.value = frameData;
  
  document.getElementById('Form_Frame')="";
  document.getElementById('saveForm').submit();
}




//loads 
function loadData(btn) 
{
  document.getElementById('Form_Load').value = btn.id; //sets load ID
  loadedFrame = true;
  
  //document.getElementById('loadForm').submit(); //page refreshes when form is submitted causing error, I need AJAX
}



//load methiod via AJAX
$(document).ready(function (){
  $('.formOption').click(function(){
    $.ajax({url:'',
    type:'get',
    data:
      {
      message:this.id //returns selected ID
      },success: function(response) 
      {
        //console.log(response.frames);
        jsonFrames = response.frames; //gets JSON from backend
        const obj = JSON.parse(jsonFrames); //breaks up the json frames and puts into array called obj
        frameLength = obj.Frame_Data.length //gets the amount of frames in JSON

        for (let rmCount = 0;rmCount < frames.length-1; rmCount++) {deleteFrame();} //removed any precreated frames before load 
        for (let fCount = 0; fCount < frameLength-1; fCount++){addFrame();} //creates blank frames needed for the animation
        for (let i = 0; i < frameLength; i++) //loads each frame
        {

            document.querySelector(`img[data-index="${currentFrame}"]`).src = obj.Frame_Data[i].frame; //sets frame to frame in array
            frames[i].src = obj.Frame_Data[i].frame; //sets the current frame to what is in the array
            frames[currentFrame].canvas.toDataURL(); 
            frames.push(get(0, 0, width, height));
            nextFrame(); //moves onto next frame
            
          }

      
      }
    });


  });
});