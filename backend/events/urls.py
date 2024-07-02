# events/urls.py

from django.urls import path
from .views import EventList, EventDetail, SendEmailAPIView

urlpatterns = [
    path('events/', EventList.as_view(), name='event-list'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('events/<int:pk>/send_email/', SendEmailAPIView.as_view(), name='send-email'),
]
