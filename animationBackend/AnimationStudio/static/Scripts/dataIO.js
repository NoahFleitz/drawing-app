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
        jsonFrames = response.frames;
        const obj = JSON.parse(jsonFrames);
        frameLength = obj.Frame_Data.length

        for (let rmCount = 0;rmCount < frames.length-1; rmCount++) {deleteFrame();} //removed any precreated frames before load 
        for (let fCount = 0; fCount < frameLength-1; fCount++){addFrame();}
        for (let i = 0; i < frameLength; i++) 
        {

            document.querySelector(`img[data-index="${currentFrame}"]`).src = obj.Frame_Data[i].frame;
            //img = loadImage(dataURL); 
            //image(img, 0, 0);

            nextFrame();
          }

      
      }
    });


  });
});