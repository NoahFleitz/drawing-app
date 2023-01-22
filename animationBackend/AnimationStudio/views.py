from django.shortcuts import render

# Create your views here.

def homeView(request, *args, **kwargs):
    ctx = {'Message':'Hello World!'} #values that can be passed into page
    return render(request,"Home.html",ctx)

def animationStudioView(request, *args, **kwargs):
    return render(request,"AnimationStudio.html",{})