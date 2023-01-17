from django.shortcuts import render
from .serializers import RoomSerializer,MessageSerializer
from .models import Room,Message
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView,DestroyAPIView,UpdateAPIView
from rest_framework.views import APIView
from django.http import JsonResponse
from django.core import serializers

class RoomApiView(APIView):
  serializer_class=RoomSerializer
  # queryset=Room
  def post(self,request,format=None):
    room=request.data.get('name')
    isRoom=Room.objects.filter(name=room)
    if len(isRoom)>0:
      return JsonResponse({'room':isRoom[0].name})
    else:
      rom=Room.objects.create(name=room)
      return JsonResponse({'room':rom.name})

  def get(self,request,format=None):
    rooms=Room.objects.all()
    rooms_json=serializers.serialize("json",rooms)
    return JsonResponse(rooms_json,safe=False)


class MessageApiView(ListAPIView):
  serializer_class=MessageSerializer
  queryset=Message.objects.all()

class MessageCreateApiView(APIView):
  serializer_class=MessageSerializer
  # queryset=Message.objects.all()
  def post(self,request,format=None):
    msg=request.data.get('message')
    room=request.data.get('room')
    user=request.data.get('user')
    
    Message.objects.create(room=room,message=msg,user=user)

    return JsonResponse({'iscreated':True})


  
class MessagesForExactRoomApiView(APIView):
  serializer_class=RoomSerializer
  def post(self,request,format=None):
    room=request.data.get('name')
    message=Message.objects.filter(room=room)
    messages = serializers.serialize("json", message)
    return JsonResponse(messages,safe=False)