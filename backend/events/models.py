from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=150)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title
    