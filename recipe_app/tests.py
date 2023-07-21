# import unittest
# from django.test import TestCase
# from django.contrib.auth import get_user_model

# from .serializer import (
#     RecipeSerializer,
#     MealPlanSerializer,
#     CalendarEventSerializer,
# )
# from .models import Recipe, MealPlan, CalendarEvent
# from rest_framework.test import APIClient


# class RecipeTestCase(TestCase):
#     def test_recipe_serialization(self):
#         # Create a test recipe
#         recipe = Recipe.objects.create(
#             title="Test Recipe", description="Test Description"
#         )

#         # Serialize the recipe
#         serializer = RecipeSerializer(recipe)
#         serialized_data = serializer.data

#         # Assert that the serialized data matches the expected values
#         self.assertEqual(serialized_data["title"], "Test Recipe")
#         self.assertEqual(serialized_data["description"], "Test Description")

#     def test_recipe_creation(self):
#         # Test creating a recipe
#         recipe = Recipe.objects.create(
#             title="Test Recipe", description="Test Description"
#         )

#         # Assert that the recipe is created successfully
#         self.assertEqual(recipe.title, "Test Recipe")
#         self.assertEqual(recipe.description, "Test Description")


# class UserRegistrationTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = "/dj-rest-auth/registration/"
#         self.user_data = {
#             "username": "testuser",
#             "email": "testuser@example.com",
#             "password1": "testpassword",
#             "password2": "testpassword",
#         }

#     def test_user_registration(self):
#         response = self.client.post(self.url, self.user_data, format="json")
#         self.assertEqual(response.status_code, 201)

#     def test_user_registration_invalid_data(self):
#         invalid_data = self.user_data.copy()
#         invalid_data["password2"] = "differentpassword"
#         response = self.client.post(self.url, invalid_data, format="json")
#         self.assertEqual(response.status_code, 400)
