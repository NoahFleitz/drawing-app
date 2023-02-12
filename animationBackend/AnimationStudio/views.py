from django.shortcuts import render
from .models import AnimationData
from .forms import saveAnimation
import json
from login.models import discordUser
# Create your views here.
from django.contrib.auth.decorators import login_required

def homeView(request, *args, **kwargs):
    return render(request,"Home.html",{"Username":getUsername(request)})

@login_required(login_url="/oauth2/login") #function only works if user is logged in send to login if not logged in
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
            AnimationData.objects.create(frame=frameJson,UID=getID(request),Title=saveForm.cleaned_data['title'])
            #x = json.loads(frameJson)
    userAnimationList = AnimationData.objects.filter(UID=getID(request))
    context = {'form':saveForm, "Username":getUsername(request),"userAnimationList":userAnimationList}
    return render(request,"AnimationStudio.html",context)




def loadAnimationView(request, *args, **kwargs):
    userAnimationList = AnimationData.objects.filter(UID=getID(request))
    ctx  = {"Username":getUsername(request), "userAnimationList":userAnimationList}
    return render (request,"loadAnimations.html",ctx)




#my sketchy way to convert user object to string
def getUsername(request): 
    if request.user.is_authenticated:
        user  = str(request.user)
        username = user[20:len(user)-1]
        return discordUser.objects.get(id=username).discord_tag
    else:
        return "Guest"
#passable future merge
def getID(request):
    if request.user.is_authenticated:
        user  = str(request.user)
        username = user[20:len(user)-1]
        return username
    else:
        return "Guest"
