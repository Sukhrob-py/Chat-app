from rest_framework.serializers import ModelSerializer
from .models import RegisterModel

class RegisterSerializer(ModelSerializer):
  class Meta:
    model=RegisterModel
    fields="__all__"

class LoginSerializer(ModelSerializer):
  class Meta:
    model=RegisterModel
    fields=['username','password']
