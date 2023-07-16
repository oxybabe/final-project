from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not password:
            raise ValueError("A password is required.")
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    objects = AppUserManager()

    def __str__(self):
        return self.username


# def create_group_and_permissions():
#     user_group, created = Group.objects.get_or_create(name="User")
#     Recipe = apps.get_model("recipe_app", "Recipe")
#     recipe_content_type = ContentType.objects.get_for_model(Recipe)

#     add_permission = Permission.objects.get_or_create(
#         codename="add_recipe", name="can add recipe", content_type=recipe_content_type
#     )
#     change_permission = Permission.objects.get_or_create(
#         codename="change_recipe",
#         name="can change recipe",
#         content_type=recipe_content_type,
#     )
#     delete_permission = Permission.objects.get_or_create(
#         codename="delete_recipe",
#         name="can delete recipe",
#         content_type=recipe_content_type,
# )

# user_group.permissions.add(add_permission, change_permission, delete_permission)
# user = User.objects.get(username='')
# user.groups.add(user_group)
