from django.urls import path
from .views import (
    LoginView,
    TokenRefreshView,
    RegisterView,
    CurrentUserView,
    LogoutView
)

urlpatterns = [
    # ثبت‌نام کاربر
    path('register/', RegisterView.as_view(), name='register'),

    # ورود کاربر (Login) – توکن دسترسی JSON + رفرش HttpOnly cookie
    path('login/', LoginView.as_view(), name='login'),

    # دریافت توکن دسترسی جدید از رفرش کوکی
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # اطلاعات کاربر جاری
    path('user/', CurrentUserView.as_view(), name='current-user'),

    # خروج (Logout)
    path('logout/', LogoutView.as_view(), name='auth_logout'),
]
