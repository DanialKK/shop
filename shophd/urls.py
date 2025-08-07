from django.contrib import admin
from django.urls import path, include
from shop.api_urls import urlpatterns as shop_api_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(shop_api_urls)),
]
