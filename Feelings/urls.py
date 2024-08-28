"""
URL configuration for Feelings project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path
from sentiment import views
from sentiment import login_view

urlpatterns = [
    path('', views.home, name='home'),  # Root URL
    path('user/', views.userApi, name='user'),
    path('user/<int:id>/', views.userApi, name='user_detail'),
    path('login',login_view.loginApi,  name='login'),
    path('admin/', admin.site.urls),
    path('signup', views.signUp, name='signup'),
    path('task', views.task, name='task'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
