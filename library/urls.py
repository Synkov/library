from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
<<<<<<< HEAD
from graphene_django.views import GraphQLView
=======
>>>>>>> master
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
<<<<<<< HEAD
from usersapp.views import UserViewSet
=======
from usersapp.views import UserViewSet, UserViewSet
>>>>>>> master

schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version="0.1",
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
router.register("projects", ProjectModelViewSet)
router.register("todos", ToDoModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path("api-token-auth/", views.obtain_auth_token),
<<<<<<< HEAD
    # path("api/v<int:version>/users/", UserViewSet.as_view({"get": "list"})),
    path("api/v<str:version>/", include(router.urls)),
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("graphql/", GraphQLView.as_view(graphiql=True), name="graphql"),
=======
    path("api/v<int:version>/users/", UserViewSet.as_view({"get": "list"})),
    re_path(r"^swagger(?P<format>\.json|\.yaml)$", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
>>>>>>> master
]
