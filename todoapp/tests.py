import json

from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APISimpleTestCase, APITestCase, force_authenticate

from ..usersapp.models import User
from .models import Project, ToDo
from .views import ProjectModelViewSet, ToDoModelViewSet


class TestProjectModelViewSet(TestCase):
    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/projects/")
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_ToDo_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/todo/")
        view = ToDoModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project(self):
        factory = APIRequestFactory()
        data = {"name": "Test_project", "repository": "http://localhost", "users": []}
        request = factory.post("/api/projects/", data=data, format="json")
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_with_auth(self):
        factory = APIRequestFactory()

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        admin_id = admin.id

        data = {
            "name": "Test_project",
            "repository": "http://localhost",
            "users": [admin_id],
        }
        request = factory.post("/api/projects/", data=data, format="json")

        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestToDoViewSet(APITestCase):
    def test_get_ToDo_list(self):
        response = self.client.get("/api/todo/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        self.client.login(username="admin", password="password")
        response = self.client.get("/api/todo/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_ToDo(self):
        user = User.objects.create(email="user@local.host", username="user", password="password")

        project = Project.objects.create(name="Test_project", repository="http://localhost")
        project.users.add(user)

        todo = ToDo.objects.create(project=project, create=user, text="test text")

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        self.client.login(username="admin", password="password")

        response = self.client.put(
            f"/api/todo/{todo.id}/",
            {"project": project.id, "create": user.id, "text": "SOME TEXT"},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = ToDo.objects.get(uuid=todo.uuid)
        self.assertEqual(todo.task_text, "NEW TEXT")

        self.client.logout

    def test_edit_ToDo_mixer(self):

        todo = mixer.blend(ToDo)

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        self.client.login(username="admin", password="password")

        response = self.client.put(
            f"/api/todo/{todo.id}/",
            {
                "project": todo.project.id,
                "create": todo.create.id,
                "text": "SOME TEXT",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = ToDo.objects.get(uuid=todo.uuid)
        self.assertEqual(todo.text, "SOME TEXT")

        self.client.logout
