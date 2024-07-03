from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Event(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, null=True)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=150)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Event, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    