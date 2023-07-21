from django.db import models

# from django.contrib.auth.models import AbstractUser

from django.conf import settings
from django.utils.html import mark_safe


# Create your models here.


class Recipe(models.Model):
    title = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    imageURL = models.CharField(max_length=5000, null=True, blank=True)
    description = models.CharField(max_length=500, null=True)
    dish_type = models.CharField(max_length=50, null=True, blank=True)
    cooking_time = models.IntegerField(null=True, blank=True)
    servings = models.IntegerField(null=True, blank=True)
    ingredients = models.CharField(max_length=5000, null=True)
    directions = models.CharField(max_length=5000, null=True)
    author_id = models.IntegerField(null=True, blank=True)

    def img_preview(self):  # new
        return mark_safe(f'<img src = "{self.image.url}" width = "300"/>')


# https://codinggear.blog/how-to-upload-images-in-django/
# https://codinggear.blog/how-to-show-image-in-django-admin/


class CalendarEvent(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    all_day = models.BooleanField(default=True)
    date = models.DateField(null=True)
    author_id = models.IntegerField(null=True, blank=True)


# https://www.sankalpjonna.com/learn-django/the-right-way-to-use-a-manytomanyfield-in-django
