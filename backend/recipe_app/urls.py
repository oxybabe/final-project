from django.urls import path
from . import views


urlpatterns = [
    # path("home/", views.HomeView.as_view(), name="home"),
    # path("", views.getRecipe),
    # path("post/", views.postRecipe),
    path("recipes/", views.RecipeListAPIView.as_view(), name="recipe_list"),
    path("recipes/<int:pk>/", views.RecipeDetailView.as_view(), name="recipe_detail"),
    path("mealplans/", views.MealPlanListAPIView.as_view(), name="meal_plan_list"),
    path(
        "mealplans/<int:pk>/",
        views.MealPlanDetailView.as_view(),
        name="meal_plan_detail",
    ),
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
    path("users/", views.UserList.as_view()),
    path("users/<int:pk>", views.UserDetail.as_view()),
    # path(
    #     "dj-rest-auth/registration/",
    #     views.UserRegisterView.as_view(),
    #     name="user_register",
    # ),
    # path("update/", views.updateRecipe),
    # path("delete/", views.deleteRecipe),
    # path("logout/", views.LogoutView.as_view(), name="logout"),
]
