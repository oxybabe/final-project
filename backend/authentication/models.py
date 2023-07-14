from django.db import models

# from django.contrib.auth.models import User
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django import apps


# Create your models here.


def create_group_and_permissions():
    user_group, created = Group.objects.get_or_create(name="User")
    Recipe = apps.get_model("recipe_app", "Recipe")
    recipe_content_type = ContentType.objects.get_for_model(Recipe)

    add_permission = Permission.objects.get_or_create(
        codename="add_recipe", name="can add recipe", content_type=recipe_content_type
    )
    change_permission = Permission.objects.get_or_create(
        codename="change_recipe",
        name="can change recipe",
        content_type=recipe_content_type,
    )
    delete_permission = Permission.objects.get_or_create(
        codename="delete_recipe",
        name="can delete recipe",
        content_type=recipe_content_type,
    )

    user_group.permissions.add(add_permission, change_permission, delete_permission)
    # user = User.objects.get(username='elia')
    # user.groups.add(user_group)
