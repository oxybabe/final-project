from django.urls import path
from .views import CalendarEventListAPIView, RecipeDetailView, RecipeListAPIView


urlpatterns = [
    path("recipes/<int:author_id>", RecipeListAPIView.as_view(), name="recipe_list"),
    path("recipe/<int:pk>/", RecipeDetailView.as_view(), name="recipe_detail"),
    path(
        "calendarevents/<int:author_id>",
        CalendarEventListAPIView.as_view(),
        name="calendarevent-list",
    ),
]
