from django.db import models

from django.conf import settings
from django.utils.html import mark_safe


# Create your models here.


class Recipe(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1
    )
    title = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to="images/", null=True, blank=True)
    description = models.CharField(max_length=500, null=True)
    cooking_time = models.IntegerField(null=True, blank=True)
    servings = models.IntegerField(null=True, blank=True)
    ingredients = models.CharField(max_length=5000, null=True)
    directions = models.CharField(max_length=5000, null=True)
    nutrition = models.CharField(max_length=5000, null=True)

    def img_preview(self): #new
        return mark_safe(f'<img src = "{self.image.url}" width = "300"/>')
