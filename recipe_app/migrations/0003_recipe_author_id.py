# Generated by Django 4.2.2 on 2023-07-18 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0002_remove_recipe_user_recipe_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='author_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
