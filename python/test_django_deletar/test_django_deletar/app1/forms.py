from django import forms

from .models import ModelEG

class MyFormForm(forms.ModelForm):
    class Meta:
        model = ModelEG
        fields = ['full_name', 'email'] # a ordem importa 
        ###NAO RECOMENDAVEL USAR exclude = ['timestamp'] # nao mostra oq esta na lista
    
    #VALIDATION 
    def clean_email(self): #clean_field_name is a pattern
        email = self.cleaned_data.get("email")
        email_base, provider = email.split("@")
        domain, extension = provider.split(".")
        if not domain == 'USC':
            raise forms.ValidationError("Please use USC email")
        if not extension == 'edu':
            raise forms.ValidationError("Please use edu email adress")
        
        return email #else everything
    
    def clean_full_name(self):
        full_name = self.cleaned_data.get("full_name")
        # do some validation here
        return full_name


class ContactForm(forms.Form):
    full_name = forms.CharField(required=False)
    email = forms.EmailField()
    message = forms.CharField()