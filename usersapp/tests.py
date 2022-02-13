from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient, APIRequestFactory, APISimpleTestCase, APITestCase, force_authenticate

User = get_user_model()


class TestUserModelViewSet(TestCase):
    def test_edit_user(self):
        admin = User.objects.create_superuser("admin", "admin@local.host", "password")

        client = APIClient()

        user = User.objects.create(email="user@local.host", username="user", password="password")

        client.login(username="admin", password="password")

        response = client.put(
            f"/api/users/{user.id}/",
            {
                "email": "user_new@local.host",
                "username": "user_new",
                "password": "password",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(uuid=user.id)
        self.assertEqual(user.email, "user_new@local.host")
        self.assertEqual(user.username, "user_new")
        client.logout
