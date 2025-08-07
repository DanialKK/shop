# shop/api_urls.py

from rest_framework.routers import DefaultRouter
from .api_views import ProductViewSet, CategoryViewSet, TagViewSet, OrderViewSet

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)
router.register('tags', TagViewSet)
router.register('orders', OrderViewSet)

urlpatterns = router.urls
