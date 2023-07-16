# from django import forms
# from requests import Response
# from rest_framework import generics
# from dj_rest_auth.registration.views import RegisterView

# from .serializer import UserRegisterSerializer, UserSerializer
# from .models import User

# from rest_framework.authentication import SessionAuthentication
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import permissions, status


# Create your views here.


from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    ##
    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    ##
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data}, status=status.HTTP_200_OK)


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserRegisterView(RegisterView):
#     serializer_class = UserRegisterSerializer

#     def create(self, request, *args, **kwargs):
#         print("SOMETHING's HAPPENING")
#         serializer = self.get_serializer(
#             data=request.data, context={"request": request}
#         )
#         serializer.is_valid(raise_exception=True)
#         # user = serializer.save(request=self.request)
#         self.perform_create(serializer)
#         return Response(serializer.data)


# class UserRegister(APIView):

#     def post(self, request):
#         print(request)
#         serializer = UserRegisterSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.create(request.data)

#             if user:
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(status=status.HTTP_400_BAD_REQUEST)


# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         user = authenticate(username=username, password=password)
#         if user is not None:
#             login(request, user)
#             refresh = RefreshToken.for_user(user)

#             return Response({
#                 'refresh_token': str(refresh),
#                 'access_token': str(refresh.access_token),
#             }, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# class LoginView(APIView):
#     def post(self, request):
#         # Retrieve the username and password from the request body
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         return JsonResponse({'message': 'Login successful'})

#     def http_method_not_allowed(self, request):
#         return JsonResponse({'error': 'Method not allowed'}, status=405)

# class LogoutView(APIView):
#      permission_classes = (IsAuthenticated,)
#      def post(self, request):

#           try:
#                refresh_token = request.data["refresh_token"]
#                token = RefreshToken(refresh_token)
#                token.blacklist()
#                return Response(status=status.HTTP_205_RESET_CONTENT)
#           except Exception as e:
#                return Response(status=status.HTTP_400_BAD_REQUEST)
