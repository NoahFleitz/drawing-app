from django.shortcuts import render

# Create your views here.

def demoView(request, *args, **kwargs):
    ctx = {} #values that can be passed into page
    return render(request,"demo.html",ctx)