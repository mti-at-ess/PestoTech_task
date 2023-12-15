from django.contrib.auth.models import UserManager, AbstractBaseUser as UserBaseModel
from django.db import models

from common.models import BaseModel


class UserModel(UserBaseModel, BaseModel):
    email = models.EmailField()
    username = models.CharField(max_length=10, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    objects = UserManager()
    USERNAME_FIELD = "username"
