from tasks.models import TaskModel

from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskModel
        fields = '__all__'
