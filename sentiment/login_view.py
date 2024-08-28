from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

@csrf_exempt
def loginApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        email = data.get('email')
        password = data.get('password')
        User = get_user_model()
        
        try:
            user = User.objects.get(email=email)
            if not user.is_active:
                return JsonResponse({'message': 'User is inactive'}, status=400)
            
            username = user.username
            print(f"Authenticating user: {username} with email: {email}")  # Debugging print statement
            
            user = authenticate(email=email, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return JsonResponse({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                print("Authentication failed for user:", username)  # Debugging print statement
                return JsonResponse({'message': 'Invalid credentials'}, status=400)
        except User.DoesNotExist:
            print("User does not exist for email:", email)  # Debugging print statement
            return JsonResponse({'message': 'Invalid credentials'}, status=400)
        except Exception as e:
            print("Exception:", e)  # Debugging print statement
            return JsonResponse({'message': 'Error', 'error': str(e)}, status=400)
    return JsonResponse({'message': 'Only POST method is allowed'}, status=405)
