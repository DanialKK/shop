from django.contrib import admin
from django.urls import path, include
from shop.api_urls import urlpatterns as shop_api_urls
from comment.api_urls import urlpatterns as comment_api_urls
from accounts.urls import urlpatterns as account_api_urls


urlpatterns = [
    path('admin/', admin.site.urls),

    # API Routes
    path('api/', include(shop_api_urls)),
    path('api/comments/', include(comment_api_urls)),
    path('api/auth/', include(account_api_urls)), # JWT Auth

]
