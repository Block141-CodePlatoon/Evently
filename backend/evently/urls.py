# backend/evently/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def home(request):
    return HttpResponse("Welcome to the Home Page!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('events.urls')),
    path('api/', include('guests.urls')),
    path('', home, name='home'),
    path('accounts/', include('accounts.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]