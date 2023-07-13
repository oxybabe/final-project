from rest_framework import serializers
from .models import Recipe, MealPlan, CalendarEvent
from django.contrib.auth.models import User


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class MealPlanSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True)

    class Meta:
        model = MealPlan
        fields = "__all__"


class CalendarEventSerializer(serializers.ModelSerializer):
    meal_plan = MealPlanSerializer()

    class Meta:
        model = CalendarEvent
        fields = "__all__"
#https://www.django-rest-framework.org/api-guide/relations/