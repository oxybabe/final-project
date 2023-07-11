from django.urls import path
from . import views


urlpatterns = [
    # path("home/", views.HomeView.as_view(), name="home"),
    # path("", views.getRecipe),
    # path("post/", views.postRecipe),
    path("recipes/", views.RecipeListAPIView.as_view(), name="recipe_list"),
    path("recipes/<int:pk>/", views.RecipeDetailView.as_view(), name="recipe_detail"),
    path("user/", views.UserList.as_view()),
    path("users/<int:pk>", views.UserDetail.as_view()),
    # path("update/", views.updateRecipe),
    # path("delete/", views.deleteRecipe),
    # path("logout/", views.LogoutView.as_view(), name="logout"),
]
