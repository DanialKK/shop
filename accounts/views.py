from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()


User = get_user_model()

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            response = JsonResponse({
                "access": str(refresh.access_token)
            })
            # رفرش توکن HttpOnly کوکی شود
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=False,  # http
                samesite="Strict"
            )
            return response
        return JsonResponse({"detail": "نام کاربری یا رمز عبور اشتباه است."}, status=401)

class TokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return JsonResponse({"detail": "رفرش توکن موجود نیست."}, status=401)
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return JsonResponse({"access": access_token})
        except Exception:
            return JsonResponse({"detail": "رفرش توکن نامعتبر است."}, status=401)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            response = JsonResponse({
                "access": str(refresh.access_token),
                "message": "ثبت‌نام با موفقیت انجام شد"
            })
            # رفرش توکن HttpOnly cookie
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite="Strict"
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except:
                pass
        response = JsonResponse({"detail": "خروج با موفقیت انجام شد."})
        response.delete_cookie("refresh_token")
        return response
