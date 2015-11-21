from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Photo


def create_url(request, path):
    return 'http{s}://{url}'.format(
        s='s' if request.is_secure() else '',
        url='{host}{path}'.format(
            host=request.get_host(),
            path=path
        ).replace('//', '/')
    )


class ImageSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        request = self.context['request']
        return {
            'normal': create_url(request, obj.url),
            'vignette': create_url(
                request,
                reverse('filter_image', kwargs={'filter_name': 'vignette', 'path': obj.url})
            )
        }


class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    image = ImageSerializer(read_only=True)
    preview = ImageSerializer(read_only=True)
    thumbnail = ImageSerializer(read_only=True)

    class Meta:
        model = Photo
        fields = (
            'id',
            'file',
            'created_at',
            'updated_at',
            'image',
            'preview',
            'thumbnail',
        )
