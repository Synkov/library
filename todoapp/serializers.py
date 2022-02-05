<<<<<<< HEAD
from rest_framework.serializers import ModelSerializer
=======
from rest_framework.serializers import ModelSerializer, StringRelatedField
>>>>>>> 17d7a11250244cf089fec8091b133655c22d6e89

from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"
