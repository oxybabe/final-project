from rest_framework import serializers
from .models import Recipe, MealPlan, CalendarEvent

# from django.contrib.auth.models import User
# from .models import User
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ("is_chef",)


# class TokenSerializer(serializers.ModelSerializer):
#     is_chef = serializers.ReadOnlyField(source="user.is_chef")


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
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


# class CustomRegisterSerializer(RegisterSerializer):
#     is_chef = serializers.BooleanField(default=False)
#     print("THIS IS WORKING")

#     def get_cleaned_data(self):
#         data_dict = super().get_cleaned_data()
#         data_dict["is_chef"] = self.validated_data.get("is_chef", False)
#         return data_dict

#     get_cleaned_data()


# https://www.django-rest-framework.org/api-guide/relations/
