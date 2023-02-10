from django.shortcuts import render
from .models import AnimationData,AnimationInfo
from .forms import saveAnimation
import json
import django.contrib.auth
# Create your views here.



def homeView(request, *args, **kwargs):
    ctx = {} #values that can be passed into page
    return render(request,"Home.html",ctx)

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



    context = {'form':saveForm, 'user':request.user.is_authenticated}
    return render(request,"AnimationStudio.html",context)