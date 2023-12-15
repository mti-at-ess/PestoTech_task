from django.db.models import BooleanField, DateTimeField, Model, Manager


class BaseModel(Model):
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now_add=True)
    is_active = BooleanField(default=True)
    objects = Manager()
