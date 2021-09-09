from django.contrib import admin

# Register your models here.
#from app1.models import ModelEG # poderia ser feito assim
from .models import  ModelEG # sintaxe mais apropriada(relative import)
from .forms import  MyFormForm

# olhar documentacao de admin model 
class ModelEGAdmin(admin.ModelAdmin):
    list_display = ["__unicode__", "timestamp", "updated"]
    form = MyFormForm
    #class Meta: 
    #    model = ModelEG



admin.site.register(ModelEG, ModelEGAdmin)
