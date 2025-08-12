from rest_framework.routers import DefaultRouter
from .api_views import CommentViewSet

router = DefaultRouter()
router.register('', CommentViewSet)
urlpatterns = router.urls
