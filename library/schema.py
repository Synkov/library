import graphene
from graphene_django import DjangoObjectType

from todoapp.models import Project, ToDo
from usersapp.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class Query(graphene.ObjectType):
    all_TODOs = graphene.List(ToDoType)
    all_Projects = graphene.List(ProjectType)
    all_Users = graphene.List(UserType)
    TODOs_by_project_uuid = graphene.List(ToDoType, project_uuid=graphene.UUID(required=True))
    ToDos_by_project_name = graphene.List(ToDoType, project_name=graphene.String(required=False))
    active_TODOs = graphene.List(ToDoType)

    def resolve_all_ToDos(self, info):
        return ToDo.objects.all()

    def resolve_all_Projects(self, info):
        return Project.objects.all()

    def resolve_all_Users(self, info):
        return User.objects.all()

    def resolve_ToDos_by_project_uuid(self, info, project_uuid):
        try:
            return ToDo.objects.filter(project=project_uuid)
        except ToDo.DoesNotExist:
            return None

    def resolve_ToDos_by_project_name(self, info, project_name):
        if project_name:
            try:
                return ToDo.objects.filter(project__name=project_name)
            except ToDo.DoesNotExist:
                return None
        return ToDo.objects.all()

    def resolve_active_ToDos(self, info):
        try:
            return ToDo.objects.filter(is_active=True)
        except ToDo.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
