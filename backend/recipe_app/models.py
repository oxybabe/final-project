from django.db import models

from django.conf import settings


# Create your models here.


class Recipe(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=True)
    cooking_time = models.IntegerField(null=True, blank=True)
    servings = models.IntegerField(null=True, blank=True)
    ingredients = models.CharField(max_length=5000, null=True)
    directions = models.CharField(max_length=5000, null=True)
    nutrition = models.CharField(max_length=5000, null=True)
