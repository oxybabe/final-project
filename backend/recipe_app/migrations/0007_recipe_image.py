# Generated by Django 4.2.2 on 2023-07-12 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0006_alter_recipe_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, upload_to='images/'),
        ),
    ]