from django import forms



# Create your views here.


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
