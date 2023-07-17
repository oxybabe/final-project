from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.

class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, unique=True
    )
   

    def __str__(self):
        return self.user.username
    
    User.profile = property(lambda u: Profile.objects.get_or_create(user=u)[0])