from django_filters import rest_framework as filters

from .models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        models = Project
        fields = ["name"]


class ToDoFilter(filters.FilterSet):
    text = filters.CharFilter(lookup_expr="contains")

    class Meta:
        models = ToDo
        fields = ["text"]
