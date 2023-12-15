from django.db.models import TextChoices


class TaskStatus(TextChoices):
    IN_PROGRESS = "In-Progress"
    TODO = "To Do"
    DONE = "Done"
