from django import forms
from .models import AnimationData
class saveAnimation(forms.Form):
    frame = forms.CharField(widget = forms.HiddenInput(attrs={'id':'Form_Frame'}))
    title = forms.CharField()

class loadAnimation(forms.Form):
    id = forms.CharField(widget = forms.HiddenInput({'id':'Form_Load'}),required=False)