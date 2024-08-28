from django.contrib import admin
from django.urls import path
from sentiment import views
from sentiment import login_view
from sentiment import models




urlpatterns = [
    path('', views.home, name='home'),  # Root URL
    path('user/', views.userApi, name='user'),
    path('user/<int:id>/', views.userApi, name='user_detail'),
    path('signup', views.signUp, name='signup'),
    path('login',login_view.loginApi),
    path('admin/', admin.site.urls),
    path('task', views.task, name='task'),
]