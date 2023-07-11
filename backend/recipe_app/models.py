from django.db import models


# Create your models here.
class Recipe(models.Model):
    title = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=True)
    cooking_time = models.IntegerField(null=True, blank=True)
    servings = models.IntegerField(null=True, blank=True)
    ingredients = models.CharField(max_length=5000, null=True)
    directions = models.CharField(max_length=5000, null=True)
    nutrition = models.CharField(max_length=5000, null=True)
