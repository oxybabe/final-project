# Generated by Django 4.2.2 on 2023-07-19 15:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0007_remove_calendarevent_title_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MealPlan',
        ),
    ]