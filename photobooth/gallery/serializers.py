from rest_framework import serializers

from .models import Photo


class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photo
        fields = (
            'id',
            'file',
            'created_at',
            'updated_at',
            'thumbnail_url',
        )
