from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Room(models.Model):
  name=models.CharField(max_length=100,unique=True)
  def __str__(self):
    return self.name

class Message(models.Model):
  room=models.CharField(max_length=255)
  message=models.CharField(max_length=1000)
  user=models.CharField(max_length=255)

  def __str__(self):
    return self.user+' '+self.room
