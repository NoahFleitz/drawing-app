from django.shortcuts import render
from .models import AnimationData,AnimationInfo
from .forms import saveAnimation
import json
from login.models import discordUser
# Create your views here.

def homeView(request, *args, **kwargs):
    return render(request,"Home.html",{"Username":getUsername(request)})

def animationStudioView(request, *args, **kwargs):
    
    saveForm = saveAnimation()
    if request.method == "POST":
        saveForm = saveAnimation(request.POST)
        if saveForm.is_valid():
            
            frames  = saveForm.cleaned_data["frame"][9:-1]

            frameJson = '''
            {
                "Frame_Data": [
                '''+ frames +'''
                ]
            }
            '''
            AnimationData.objects.create(frame=frameJson,FRID="121212")
            #x = json.loads(frameJson)



    context = {'form':saveForm, "Username":getUsername(request)}
    return render(request,"AnimationStudio.html",context)


#my sketchy way to convert user object to string
def getUsername(request): 
    if request.user.is_authenticated:
        user  = str(request.user)
        username = user[20:len(user)-1]
        return discordUser.objects.get(id=username).discord_tag
    else:
        return "Guest"
    
