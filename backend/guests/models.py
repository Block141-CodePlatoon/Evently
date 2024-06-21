from django.db import models
from events.models import Event

class Guest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    event = models.ForeignKey(Event, related_name='guests', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name