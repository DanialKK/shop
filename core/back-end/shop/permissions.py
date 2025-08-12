from rest_framework.permissions import BasePermission

class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        print(f"[Permission Check] User: {user}, Authenticated: {user.is_authenticated if user else 'No User'}, Is Superuser: {user.is_superuser if user else 'No User'}")
        return bool(user and user.is_authenticated and user.is_superuser)
