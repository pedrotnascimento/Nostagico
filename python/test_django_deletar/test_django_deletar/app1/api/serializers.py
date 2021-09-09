from rest_framework.serializers import ModelSerializer

from ..models import ModelEG

class ModelEGSerializer(ModelSerializer):
    class Meta:
        model = ModelEG
        fields = [
            'full_name',
            'email'
        ]