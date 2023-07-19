from django.urls import path
from . import views


urlpatterns = [
    # path("home/", views.HomeView.as_view(), name="home"),
    # path("", views.getRecipe),
    # path("post/", views.postRecipe),
    path(
        "recipes/<int:author_id>", views.RecipeListAPIView.as_view(), name="recipe_list"
    ),
    path("recipe/<int:pk>/", views.RecipeDetailView.as_view(), name="recipe_detail"),
    # path("mealplans/", views.MealPlanListAPIView.as_view(), name="meal_plan_list"),
    # path(
    #     "mealplans/<int:pk>/",
    #     views.MealPlanDetailView.as_view(),
    #     name="meal_plan_detail",
    # ),
    path(
        "calendarevents/",
        views.CalendarEventListAPIView.as_view(),
        name="calendar_event",
    ),
    path(
        "calendarevents/<int:pk>",
        views.CalendarEventDetailView.as_view(),
        name="calendar_event_detail",
    ),
    # ),
    # path("update/", views.updateRecipe),
    # path("delete/", views.deleteRecipe),
    # path("logout/", views.LogoutView.as_view(), name="logout"),
]
