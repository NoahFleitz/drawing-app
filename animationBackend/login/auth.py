from django.contrib.auth.backends import BaseBackend
from .models import discordUser

class DiscordAuthenticationBackend(BaseBackend):
    def authenticate(self, request, user):#called to 
        find_user= discordUser.objects.filter(id=user['id'])#checks if users ID is in the database created in models
        if len(find_user) == 0: #if user is not found in database
            print("User not Found")
            new_user = discordUser.objects.create_new_discord_user(user) #adds user to database since they do not exist
            return(new_user)
        return(find_user) #if user is found in the database