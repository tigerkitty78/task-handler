from rest_framework import serializers
from Feelings import settings
from sentiment.models import Task, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Corrected 'passwrod' to 'password'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    
class TaskSerializer(serializers.ModelSerializer):
   
    #user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    #user_id = serializers.PrimaryKeyRelatedField(source='user.id', read_only=True,required=False)
    #user_username = serializers.CharField(source='user.username', read_only=True)
   
    
    class Meta:
        model = Task
        fields = ['id', 'category', 'description', 'due_date', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id',  'created_at', 'updated_at']