from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from django.http import JsonResponse
from django.contrib.auth.models import User, auth

from .serializers import RegisterSerializer, LoginSerializer


class RegisterCreateAPI(CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        password_confirm = request.data.get("password_confirm")
        if password != password_confirm:
            return JsonResponse({'error': 'password not match'})
        elif len(User.objects.filter(email=email)) > 0:
            return JsonResponse({'error': 'this email already exist'})
        elif len(User.objects.filter(username=username)) > 0:
            return JsonResponse({'error': 'this username already exist'})
        else:
            user = User.objects.create_user(email=email, password=password, username=username)
            # user.save()
            return JsonResponse({'login':True,'username':username,'email':email},safe=False)
        # return self.create(request, *args, **kwargs)


class LoginCreateApi(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = auth.authenticate(username=username, password=password)
        if not user is None:
            auth.login(request, user)
            return JsonResponse({'login':True,'username':username,'email':user.email},safe=False)
        else:
            return JsonResponse({'login': False})
        