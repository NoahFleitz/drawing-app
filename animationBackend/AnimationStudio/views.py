from django.shortcuts import render
from .models import AnimationData
from .forms import saveAnimation, loadAnimation
import json
from login.models import discordUser
# Create your views here.
from django.contrib.auth.decorators import login_required

def homeView(request, *args, **kwargs):
    return render(request,"Home.html",{"Username":getUsername(request)})

@login_required(login_url="/oauth2/login") #function only works if user is logged in send to login if not logged in
def animationStudioView(request, *args, **kwargs):
    

    #calls if user world like to save their form
    saveForm = saveAnimation()
    if request.method == "POST" and request.POST.get('name') == "save":
        saveForm = saveAnimation(request.POST)
        if saveForm.is_valid():   
            frames = saveForm.cleaned_data["frame"][9:-1]
            frameJson = '''
            [
                {"Frame_Data": 
                '''+ frames +'''
            ]
            '''
            AnimationData.objects.create(frame=frameJson,UID=getID(request),Title=saveForm.cleaned_data['title'])
    
    loadFrame = ""
    #calls if user world load to load one of their animations
    loadForm = loadAnimation()
    if request.method == "POST" and request.POST.get('name') == "load":
        loadForm = loadAnimation(request.POST)
        if loadForm.is_valid():
            loadedJson = AnimationData.objects.filter(id=loadForm.cleaned_data['id'])
            #print(loadedJson[0].frame)
            loadFrame = loadedJson[0].frame #loads frame to templete
            
    userAnimationList = AnimationData.objects.filter(UID=getID(request))
    context = {'Saveform':saveForm,'loadForm':loadForm, "Username":getUsername(request),"userAnimationList":userAnimationList,"loadedFrames":loadFrame}
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
