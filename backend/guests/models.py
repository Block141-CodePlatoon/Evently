# guests/models.py

from django.db import models
from events.models import Event

class Guest(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    event = models.ForeignKey(Event, related_name='guests', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name