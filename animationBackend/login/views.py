from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect
import requests
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required(login_url="/oauth2/login") #function only works if user is logged in send to login if not logged in
def get_authenticated_user(request: HttpRequest):
    return(JsonResponse({"msg":"Authenticated"}))



auth_url = "https://discord.com/api/oauth2/authorize?client_id=1072731726687780895&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth2%2Flogin%2Fredirect&response_type=code&scope=identify"
def discord_login(request:HttpRequest):
    return redirect (auth_url)

def discord_login_redirect(request: HttpRequest):
    code  = request.GET.get('code') #gets the code returned from Discord
    user = exchnage_code(code) #runs the exchnage function
    discord_user  = authenticate(request, user=user) #calls costom authenticateion of found user
    discord_user  = list(discord_user).pop() #gets the specfic user from query set
    login(request,discord_user) #loggs in user
    return(redirect("/oauth2/user"))



def exchnage_code(code: str):
    data = {
        "client_id":"1072731726687780895",
        "client_secret":"_yjWqWFGwQrHVAKNZOHRLlI4nxqg4D3O",
        "grant_type": "authorization_code",
        "code":code,
        "redirect_uri":"http://localhost:8000/oauth2/login/redirect",
        "scope":"identify"
    }

    headers = {
        "Content-Type":'application/x-www-form-urlencoded'
    }

    response  = requests.post("https://discord.com/api/oauth2/token", data=data, headers=headers) #send token
    credentials = response.json() #converts to json
    access_token = credentials['access_token'] #saves access token
    response = requests.get('https://discord.com/api/v10/users/@me', headers = { 'Authorization':'Bearer %s' % access_token}) #gets user info by sending token
    user  = response.json() 
    #print(user)
    return user
    
