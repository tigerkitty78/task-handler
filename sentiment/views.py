from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from sentiment.models import User,Task
from sentiment.serializers import UserSerializer,TaskSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_auth(request):
    return Response({"message": "Authenticated"})


def home(request):
    return JsonResponse({"message": "Welcome to the home page!"})

@csrf_exempt
def userApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            users = User.objects.all()
            user_serializer = UserSerializer(users, many=True)
            return JsonResponse(user_serializer.data, safe=False)
        else:
            user = User.objects.get(id=id)
            user_serializer = UserSerializer(user)
            return JsonResponse(user_serializer.data, safe=False)
        
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(id=id)
        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        user = User.objects.get(id=id)
        user.delete()
        return JsonResponse("Deleted Successfully", safe=False)





def signUp(request, id=0) : 
     if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
     
@csrf_exempt
@authentication_classes([TokenAuthentication])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def task(request,id=0) :
    JWT_authenticator = JWTAuthentication()
    response = JWT_authenticator.authenticate(request)
    if response is not None:
        user, token = response
    else:
     user = None
     if request.method == 'POST':
        print(f"Authorization Header: {request.META.get('HTTP_AUTHORIZATION')}")
        print(f"User is authenticated: {request.user.is_authenticated}")
        print(f"User: {request.user}")

        print(f"User is authenticated: {request.user.is_authenticated}")
        print(f"User: {request.user}")
        if not request.user.is_authenticated:
          return JsonResponse({'error': 'Unauthorized'}, status=401)

        user_id = request.user.id
        task_data = JSONParser().parse(request)
        task_data['user'] = user_id
        if user_id is None:
            return JsonResponse({'error': 'User ID could not be retrieved from request.'}, status=400)
        task_serializer = TaskSerializer(data=task_data)
        if task_serializer.is_valid():
            task_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse(task_serializer.errors, safe=False, status=400)
     

     elif request.method =='GET':
          if id == 0:
            tasks = Task.objects.all()
            task_serializer = TaskSerializer(tasks, many=True)
            return JsonResponse(task_serializer, safe=False)
          else:
            task = Task.objects.get(id=id)
            task_serializer = UserSerializer(task)
            return JsonResponse(task_serializer.data, safe=False)