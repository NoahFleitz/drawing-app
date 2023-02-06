from django.db import models

class AnimationData(models.Model):
    frame = models.TextField()
    FRID = models.CharField(max_length=6)
    Title = models.CharField(max_length=40)
    Description = models.TextField()

#AnimationInfo

class userData(models.Model):
    Username = models.CharField(max_length=40)
    FRID = models.CharField(max_length=6)
    





