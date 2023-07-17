from django.shortcuts import redirect, render
from requests import Response

# from requests import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from .models import Recipe, MealPlan, CalendarEvent
from dj_rest_auth.registration.views import RegisterView

# from django.contrib.auth import get_user_model

# User = get_user_model()


from .serializer import (
    RecipeSerializer,
    MealPlanSerializer,
    CalendarEventSerializer,
)
from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    IsAdminUser,
    AllowAny,
)
from rest_framework import permissions
from rest_framework import status


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


permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RecipeListAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    # def get_queryset(self):
    #     print(self)
    #     return Recipe.objects.filter(user=self.request.user.id)

    # filters so only the user sees their list of recipes

    # def perform_create(self, serializer):
    #     if self.request.user.is_authenticated:
    #         serializer.save(user=self.request.user.id)
    #     else:
    #         serializer.save()


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class MealPlanListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = MealPlanSerializer
    queryset = MealPlan.objects.all()


class MealPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = MealPlanSerializer
    queryset = MealPlan.objects.all()


class CalendarEventListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = CalendarEventSerializer
    queryset = CalendarEvent.objects.all()


class CalendarEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = CalendarEventSerializer
    queryset = CalendarEvent.objects.all()


# class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserRegistrationView(RegisterView):
#     def perform_create(self, serializer):
#         user = serializer.save()


# https://www.django-rest-framework.org/api-guide/generic-views/


# @api_view(['GET'])
# def getRecipe(request):
#     recipe = Recipe.objects.all()
#     serializer = RecipeSerializer(recipe, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# def postRecipe(request):
#     serializer = RecipeSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['PUT'])
# def updateRecipe(request):
#     serializer = RecipeSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['DELETE'])
# def deleteRecipe(request):
#     serializer = RecipeSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)


#  https://www.makeuseof.com/django-rest-api-create/
