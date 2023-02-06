from django import forms
from .models import userData,AnimationData
class saveAnimation(forms.Form):
    frame = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_Frame'}))
    FRID  = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_FRID'}))

class selectAnimation(forms.Form):
    FRID = forms.CharField(max_length=6)