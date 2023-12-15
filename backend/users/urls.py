from django.urls import path
from .views import UserLCView, UserCreateView, UserRUDView

urlpatterns = [
    path("<int:pk>", UserRUDView.as_view(), name="users_read_update_delete"),
    path("register", UserCreateView.as_view(), name="users_create"),
    path("", UserLCView.as_view(), name="users_list"),
]
