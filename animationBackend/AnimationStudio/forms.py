from django import forms
from .models import AnimationData
class saveAnimation(forms.Form):
    frame = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_Frame'}), required=False)
    title = forms.CharField(initial = "My Animation Name") #need default in the future
class loadAnimation(forms.Form):
    id = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_Load'}),required=False)