from django.urls import path
from . import views


urlpatterns = [
    path("home/", views.HomeView.as_view(), name="home"),
    # path('', views.getFood),
    # path('post/', views.postFood),
    # path("logout/", views.LogoutView.as_view(), name="logout"),
]
