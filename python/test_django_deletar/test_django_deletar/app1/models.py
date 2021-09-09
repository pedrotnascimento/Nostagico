from django.db import models

# Create your models here.
class ModelEG(models.Model):
    email = models.EmailField()
    full_name = models.CharField(max_length=200, # must paramtrs
                                 blank=True,
                                 null=True,
                                 default="no-name")
    timestamp = models.DateTimeField(auto_now_add=True,
                                        auto_now=False)
    updated = models.DateTimeField(auto_now_add=True,
                                        auto_now=False)
    def __unicode__(self): #python 3.3 is __str__
        return self.email #valor mostrado como referencia
    