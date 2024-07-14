# accounts/urls.py
from django.urls import path
from django.contrib.auth import views as auth_views
from .views import RegisterView, get_user_data


urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='accounts/logout.html'), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', get_user_data, name='get_user_data'),

]
