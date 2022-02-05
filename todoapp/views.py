<<<<<<< HEAD
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilter, ToDoFilter
=======
from rest_framework.viewsets import ModelViewSet

>>>>>>> 17d7a11250244cf089fec8091b133655c22d6e89
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


<<<<<<< HEAD
class ProjectPagination(PageNumberPagination):
    page_size = 10


class ToDoPagination(PageNumberPagination):
    page_size = 20


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter
=======
class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
>>>>>>> 17d7a11250244cf089fec8091b133655c22d6e89


class ToDoModelViewSet(ModelViewSet):
    serializer_class = ToDoModelSerializer
    queryset = ToDo.objects.all()
<<<<<<< HEAD
    pagination_class = ToDoPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_200_OK)
=======
>>>>>>> 17d7a11250244cf089fec8091b133655c22d6e89
