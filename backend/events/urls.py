from django.urls import path
from .views import EventList, EventDetail

urlpatterns = [
    path('events/', EventList.as_view(), name='event-list'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('events/<int:pk>/directions/', EventDetail.as_view({'get': 'get_directions'}), name='event-directions'),
    path('events/<int:pk>/send-email/', EventDetail.as_view({'post': 'send_test_email'}), name='event-send-email'),
]
