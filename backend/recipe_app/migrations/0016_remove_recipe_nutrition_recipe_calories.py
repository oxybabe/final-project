# Generated by Django 4.2.2 on 2023-07-14 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0015_mealplan_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='nutrition',
        ),
        migrations.AddField(
            model_name='recipe',
            name='calories',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
