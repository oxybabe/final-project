from django.urls import path

from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from dj_rest_auth.registration.views import RegisterView
from django.urls import path


from . import views

urlpatterns = [
    path("register/", views.UserRegister.as_view(), name="register"),
    path("login/", views.UserLogin.as_view(), name="login"),
    path("logout/", views.UserLogout.as_view(), name="logout"),
    path("user/", views.UserView.as_view(), name="user"),
]

# urlpatterns = [
#     path('register/', views.UserRegister.as_view(), name='register'),
#     # path("register/", RegisterView.as_view(), name="rest_register"),
#     path("login/", LoginView.as_view(), name="rest_login"),
#     path("logout/", LogoutView.as_view(), name="rest_logout"),
#     path("user/", UserDetailsView.as_view(), name="rest_user_details"),
#     path("users/", views.UserList.as_view()),
#     path("users/<int:pk>", views.UserDetail.as_view()),
#     path(
#         "dj-rest-auth/registration/",
#         views.UserRegisterView.as_view(),
#         name="user_register",
#     ),
# ]
