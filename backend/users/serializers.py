from users.models import UserModel
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def validate_password(self, value: str) -> str:
        return make_password(value)


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        # fields = '__all__'
        exclude = ("password", "first_name", "last_name", "email", "is_active", "last_login")
        # read_only_fields = ('username', 'is_active', 'created_at', 'updated_at')

    def validate_password(self, value: str) -> str:
        return make_password(value)
