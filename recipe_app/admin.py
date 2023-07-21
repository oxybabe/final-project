from django.contrib import admin
from .models import Recipe, CalendarEvent


class RecipeAdmin(admin.ModelAdmin):
    readonly_fields = ["img_preview"]


# Register your models here.
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(CalendarEvent)
