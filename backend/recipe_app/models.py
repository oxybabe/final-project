from django.db import models
from django.contrib.auth.models import AbstractUser

from django.conf import settings
from django.utils.html import mark_safe


# Create your models here.


class User(AbstractUser):
    is_chef = models.BooleanField(default=False)


class Recipe(models.Model):
    user = models.ManyToManyField(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    description = models.CharField(max_length=500, null=True)
    cooking_time = models.IntegerField(null=True, blank=True)
    servings = models.IntegerField(null=True, blank=True)
    ingredients = models.CharField(max_length=5000, null=True)
    directions = models.CharField(max_length=5000, null=True)

    def img_preview(self):  # new
        return mark_safe(f'<img src = "{self.image.url}" width = "300"/>')


# https://codinggear.blog/how-to-upload-images-in-django/
# https://codinggear.blog/how-to-show-image-in-django-admin/


class MealPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default=1)
    recipes = models.ManyToManyField(Recipe)


class CalendarEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meal_plan = models.ForeignKey(MealPlan, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()


# https://www.sankalpjonna.com/learn-django/the-right-way-to-use-a-manytomanyfield-in-django
