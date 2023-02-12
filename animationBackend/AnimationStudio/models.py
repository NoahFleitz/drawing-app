from django.db import models

class AnimationData(models.Model):
    frame = models.TextField()
    UID = models.CharField(max_length=6)
    Title = models.CharField(max_length=40)
    Description = models.TextField(null=True)
    






