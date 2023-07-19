from django.http import HttpResponse
from django.shortcuts import redirect, render
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
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    IsAdminUser,
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


# permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# def create_recipe(request):
# Extract the recipe data from the request

# title = request.data.get('title')
# description = request.data.get('description')
# cooking_time = request.data.get('cooking_time')
# servings = request.data.get('servings')
# ingredients = request.data.get('ingredients')
# directions = request.data.get('directions')

# # Get the authenticated user
# user = request.user

# # Create the recipe and associate it with the user
# recipe = Recipe.objects.create(
#     title=title,
#     description=description,
#     cooking_time=cooking_time,
#     servings=servings,
#     ingredients=ingredients,
#     directions=directions,
#     user=user
# )

# # Return the response
# return Response({'message': 'Recipe created successfully'})


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


# class MealPlanListAPIView(generics.ListCreateAPIView):
#     # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#     serializer_class = MealPlanSerializer
#     queryset = MealPlan.objects.all()


# class MealPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
#     # permission_classes = (IsOwnerOrReadOnly,)
#     serializer_class = MealPlanSerializer
#     queryset = MealPlan.objects.all()


class CalendarEventListAPIView(generics.ListCreateAPIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
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
