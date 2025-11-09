# shop/api_views.py

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import (
    Category, Tag, Product, ProductImage,
    Order, OrderItem, Rating
)
from .serializers import (
    CategorySerializer, TagSerializer, ProductSerializer, ProductImageSerializer,
    OrderSerializer, OrderItemSerializer, RatingSerializer
)
from .permissions import IsSuperUser


# -------------------------------
# Category & Tag
# -------------------------------
class BaseAdminEditableViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsSuperUser()]


class CategoryViewSet(BaseAdminEditableViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TagViewSet(BaseAdminEditableViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer



# -------------------------------
# Product & ProductImage
# -------------------------------
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'images']:
            return [permissions.AllowAny()]
        return [IsSuperUser()]

    # -------------------------------
    # add image
    # -------------------------------
    @action(detail=True, methods=['post'], permission_classes=[IsSuperUser])
    def add_image(self, request, pk=None):
        product = self.get_object()
        serializer = ProductImageSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save(product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # -------------------------------
    # edit image
    # -------------------------------
    @action(detail=True, methods=['put'], url_path='update-image/(?P<image_id>[^/.]+)', permission_classes=[IsSuperUser])
    def update_image(self, request, pk=None, image_id=None):
        product = self.get_object()
        try:
            image = product.images.get(id=image_id)
        except ProductImage.DoesNotExist:
            return Response({"detail": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductImageSerializer(image, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # -------------------------------
    # delete image
    # -------------------------------
    @action(detail=True, methods=['delete'], url_path='delete-image/(?P<image_id>[^/.]+)', permission_classes=[IsSuperUser])
    def delete_image(self, request, pk=None, image_id=None):
        product = self.get_object()
        try:
            image = product.images.get(id=image_id)
        except ProductImage.DoesNotExist:
            return Response({"detail": "Image not found"}, status=status.HTTP_404_NOT_FOUND)

        if image.image:
            image.image.delete(save=False)
        image.delete()
        return Response({"detail": "Image deleted"}, status=status.HTTP_204_NO_CONTENT)

    # -------------------------------
    # list images of product
    # -------------------------------
    @action(detail=True, methods=['get'], permission_classes=[permissions.AllowAny])
    def images(self, request, pk=None):
        product = self.get_object()
        serializer = ProductImageSerializer(
            product.images.all(), many=True, context={'request': request}
        )
        return Response(serializer.data)


# -------------------------------
# Orders & Order Items
# -------------------------------
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Order.objects.all()
        return Order.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [permissions.IsAuthenticated]


# -------------------------------
# Ratings
# -------------------------------
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return Rating.objects.all()
        return Rating.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
