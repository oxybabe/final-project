# Generated by Django 4.2.2 on 2023-07-19 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0011_alter_recipe_imageurl'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='calendarevent',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='calendarevent',
            name='start_date',
        ),
        migrations.AddField(
            model_name='calendarevent',
            name='all_day',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='calendarevent',
            name='end',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='calendarevent',
            name='start',
            field=models.DateTimeField(null=True),
        ),
    ]
