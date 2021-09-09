from rest_framework.generics import ListAPIView

from app1.models import ModelEG 
from .serializers import ModelEGSerializer

class  ModelEGAPIView(ListAPIView):
    queryset = ModelEG.objects.all()
    serializer_class= ModelEGSerializer