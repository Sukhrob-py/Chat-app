from django.urls import path

from .views import RoomApiView,MessageApiView,MessageCreateApiView,MessagesForExactRoomApiView

urlpatterns=[
  path('message/create/',MessageCreateApiView.as_view()),
  path('room/messages/',MessagesForExactRoomApiView.as_view()),
  path('message/',MessageApiView.as_view()),
  path('room/',RoomApiView.as_view()),
]