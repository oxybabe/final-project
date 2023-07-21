from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from requests import Response

# from requests import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view, permission_classes
from .models import Recipe, CalendarEvent
from dj_rest_auth.registration.views import RegisterView
from rest_framework.permissions import IsAuthenticated


# from django.contrib.auth import get_user_model

# User = get_user_model()


from .serializer import (
    RecipeSerializer,
    CalendarEventSerializer,
)
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
)
from rest_framework import permissions, viewsets


# Create your views here.


# class CustomRegisterView(RegisterView):
#     # queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_superuser


class RecipeListAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        author_id = self.kwargs["author_id"]
        return Recipe.objects.filter(author_id=author_id)

    # filters so only the user sees their list of recipes

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    #     if self.request.user.is_authenticated:
    #         serializer.save(user=self.request.user.id)
    #     else:
    #         serializer.save()


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeListAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def get_queryset(self):
        author_id = self.kwargs["author_id"]
        return Recipe.objects.filter(author_id=author_id)

    # filters so only the user sees their list of recipes

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    #     if self.request.user.is_authenticated:
    #         serializer.save(user=self.request.user.id)
    #     else:
    #         serializer.save()


class CalendarEventListAPIView(generics.ListCreateAPIView):
    serializer_class = CalendarEventSerializer
    # queryset = CalendarEvent.objects.all()

    def get_queryset(self):
        author_id = self.kwargs["author_id"]
        return CalendarEvent.objects.filter(author_id=author_id)

    def perform_create(self, serializer):
        recipe_id = self.request.data.get("recipe")[
            "id"
        ]  # Extract recipe_id from the request data
        date = self.request.data.get("start")
        print(recipe_id)
        recipe = get_object_or_404(Recipe, pk=recipe_id)  # Retrieve the Recipe object
        serializer.save(recipe=recipe, date=date)


class CalendarEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = CalendarEventSerializer
    queryset = CalendarEvent.objects.all()


# https://www.django-rest-framework.org/api-guide/generic-views/


#  https://www.makeuseof.com/django-rest-api-create/
