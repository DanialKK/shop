# shop/views.py
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import Category, Tag, Product, Order, OrderItem, Rating
from .serializers import (
    CategorySerializer,
    TagSerializer,
    ProductSerializer,
    OrderSerializer,
    OrderItemSerializer,
    RatingSerializer
)
from .permissions import IsSuperUser

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        print(f"User {self.request.user.username} is_staff: {self.request.user.is_staff}")  # دیباگ
        return [IsSuperUser()]  # فقط سوپر یوزر


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsSuperUser()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsSuperUser()]  # ایجاد/ویرایش/حذف فقط برای ادمین


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # فقط سفارش‌های خود کاربر رو ببینه، مگر ادمین باشه
        if self.request.user.is_staff or self.request.user.is_superuser:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]  # همه میتونن ببینن
        return [permissions.IsAuthenticated()]  # ساخت/ویرایش/حذف فقط با لاگین

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        # برای لیست و جزییات، همه امتیازها برگرده
        if self.action in ['list', 'retrieve']:
            return Rating.objects.all()
        # برای ویرایش/حذف، فقط امتیازهای خود کاربر
        return Rating.objects.filter(user=self.request.user)
