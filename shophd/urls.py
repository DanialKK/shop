from django.contrib import admin
from django.urls import path, include
from shop.api_urls import urlpatterns as shop_api_urls
from comment.api_urls import urlpatterns as comment_api_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Routes
    path('api/', include(shop_api_urls)),
    path('api/comments/', include(comment_api_urls)),
    path('api/accounts/', include('accounts.urls')),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
