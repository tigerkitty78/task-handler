from django.contrib import admin

from sentiment.models import User
from sentiment.models import Task

admin.site.register(User)
admin.site.register(Task)

# Register your models here.
