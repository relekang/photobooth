from rest_framework import serializers

from .models import Photo


class ThumbnailSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        request = self.context['request']
        return 'http{s}://{host}{path}'.format(
            s='s' if request.is_secure() else '',
            host=request.get_host(),
            path=obj.url
        )


class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    thumbnail = ThumbnailSerializer(read_only=True)

    class Meta:
        model = Photo
        fields = (
            'id',
            'file',
            'created_at',
            'updated_at',
            'thumbnail',
        )
