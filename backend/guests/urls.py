# guests/urls.py

from django.urls import path
from .views import GuestList, GuestDetail, EventGuestList

urlpatterns = [
    path('guests/', GuestList.as_view(), name='guest-list'),
    path('guests/<int:pk>/', GuestDetail.as_view(), name='guest-detail'),
    path('events/<int:event_id>/guests/', EventGuestList.as_view(), name='event-guest-list'), 

]