from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
<<<<<<< HEAD
from usersapp.views import UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
=======
from usersapp.views import UserModelViewSet

router = DefaultRouter()
router.register("users", UserModelViewSet)
>>>>>>> 17d7a11250244cf089fec8091b133655c22d6e89
router.register("projects", ProjectModelViewSet)
router.register("todos", ToDoModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
]
