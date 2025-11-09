from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from shop.api_urls import urlpatterns as shop_api_urls
from comment.api_urls import urlpatterns as comment_api_urls
from accounts.urls import urlpatterns as account_api_urls

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Routes
    path('api/', include(shop_api_urls)),
    path('api/comments/', include(comment_api_urls)),
    path('api/auth/', include(account_api_urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
