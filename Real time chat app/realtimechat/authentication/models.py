from django.db import models

# Create your models here.

class RegisterModel(models.Model):
  username=models.CharField(max_length=255)
  password=models.CharField(max_length=255)
  password_confirm=models.CharField(max_length=255,null=True)
  email=models.EmailField()

  def __str__(self):
    return self.username
