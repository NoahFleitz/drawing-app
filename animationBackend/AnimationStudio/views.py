from django.shortcuts import render

# Create your views here.

def demoView(request, *args, **kwargs):
    ctx = {}
    return render(request,"demo.html",ctx)