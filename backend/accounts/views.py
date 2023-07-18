from django.shortcuts import render
from dj_rest_auth.views import LoginView

# Create your views here.
from rest_framework import generics
from . import models
from . import serializers


class UserListAPIView(generics.ListAPIView):
    queryset = models.User.objects.order_by("id")
    serializer_class = serializers.UserSerializer


class ProfileListAPIView(generics.ListAPIView):
    queryset = models.Profile.objects.order_by("id")
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer


class CustomLoginView(LoginView):
    def get_response_serializer(self):
        return serializers.CustomLoginSerializer
    
    