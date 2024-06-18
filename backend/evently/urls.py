from django.contrib import admin
from django.urls import path, include  # Include the 'include' function

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('event.urls')),  # Include URLs from the 'event' app
]
