from django.http import JsonResponse
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from .models import Recipe
from .serializer import RecipeSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    IsAdminUser,
)
from django.contrib.auth.models import User
from rest_framework import permissions


# Create your views here.


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_superuser


permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RecipeListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class HomeView(APIView):
#     permission_classes = (IsAuthenticated,)

#     def get(self, request):
#         content = {"message": "Welcome to the Aunthentication page!"}
#         return Response(content)


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
