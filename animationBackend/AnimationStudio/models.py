from django.db import models

class AnimationData(models.Model):
    frame = models.TextField()
    FRID = models.CharField(max_length=6)



class AnimationInfo(models.Model):
    Username = models.CharField(max_length=200)
    FRID = models.CharField(max_length=6)
    Description = models.TextField()





