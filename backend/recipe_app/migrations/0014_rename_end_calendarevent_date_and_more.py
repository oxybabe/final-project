# Generated by Django 4.2.2 on 2023-07-19 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0013_alter_calendarevent_end_alter_calendarevent_start'),
    ]

    operations = [
        migrations.RenameField(
            model_name='calendarevent',
            old_name='end',
            new_name='date',
        ),
        migrations.RemoveField(
            model_name='calendarevent',
            name='start',
        ),
    ]
