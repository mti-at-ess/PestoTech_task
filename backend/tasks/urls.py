from django.urls import path
from .views import TaskLCView, TaskRUDView

urlpatterns = [
    path("<int:pk>", TaskRUDView.as_view(), name="tasks_read_update_delete"),
    path("", TaskLCView.as_view(), name="tasks_list_create"),
]
