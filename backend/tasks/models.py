from django.db.models import CharField, BooleanField, DateTimeField, Manager
from common.models import BaseModel
from tasks.enums import TaskStatus


class TaskModel(BaseModel):
    title = CharField(max_length=50)
    description = CharField(max_length=255)
    status = CharField(max_length=20, choices=TaskStatus.choices, default=TaskStatus.TODO)
