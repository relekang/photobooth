from django.contrib import admin

from photobooth.gallery.models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['inline_thumbnail', 'created_at', 'is_active', 'like_count']
