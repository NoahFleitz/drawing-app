from django import forms
from .models import AnimationInfo,AnimationData
class saveAnimation(forms.Form):
    frame = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_Frame'}))
    FRID  = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_FRID'}))