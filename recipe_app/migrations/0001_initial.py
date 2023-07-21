# Generated by Django 4.2.2 on 2023-07-16 20:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('description', models.CharField(max_length=500, null=True)),
                ('cooking_time', models.IntegerField(blank=True, null=True)),
                ('servings', models.IntegerField(blank=True, null=True)),
                ('ingredients', models.CharField(max_length=5000, null=True)),
                ('directions', models.CharField(max_length=5000, null=True)),
                ('user', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MealPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=1, max_length=100)),
                ('recipes', models.ManyToManyField(to='recipe_app.recipe')),
            ],
        ),
        migrations.CreateModel(
            name='CalendarEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('meal_plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipe_app.mealplan')),
            ],
        ),
    ]