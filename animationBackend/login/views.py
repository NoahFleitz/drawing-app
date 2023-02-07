from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def login_request(request):
    return(render(request, "login.html"))

@login_required
def home(request):
    return(render(request,"home.html"))