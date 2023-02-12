from django import forms
from .models import AnimationData
class saveAnimation(forms.Form):
    frame = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_Frame'}))