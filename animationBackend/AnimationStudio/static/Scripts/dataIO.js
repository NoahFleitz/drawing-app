
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
  
  document.getElementById('loadForm').submit(); //page refreshes when form is submitted causing error, I need AJAX
}




//triggers after code is loaded to page from backend
function insertJSON() 
{
  jsonFrames = document.getElementById('loaded_Frames');
  const obj = JSON.parse(jsonFrames.innerText);
  frameLength = obj.Frame_Data.length
    for (let i = 0; i < frameLength; i++) 
    {
    
      console.log("T");
    }
    jsonFrames.innerHTML = "";
    
    
    
  }

