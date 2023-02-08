from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import redirect
import requests
# Create your views here.

auth_url = "https://discord.com/api/oauth2/authorize?client_id=1072731726687780895&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth2%2Flogin%2Fredirect&response_type=code&scope=identify"
def discord_login(request:HttpRequest):
    return redirect (auth_url)

def discord_login_redirect(request: HttpRequest):
    code  = request.GET.get('code')
    print(code)
    user = exchnage_code(code)
    return(JsonResponse({"user":user}))



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

    response  = requests.post("https://discord.com/api/oauth2/token", data=data, headers=headers)
    credentials = response.json()
    access_token = credentials['access_token']
    response = requests.get('https://discord.com/api/v10/users/@me', headers = { 'Authorization':'Bearer %s' % access_token})
    print(response)
    user  = response.json()
    print(user)
    return user
    
