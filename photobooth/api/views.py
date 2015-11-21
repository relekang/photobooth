from PIL import Image
from io import BytesIO

from django.http import HttpResponse
from rest_framework import viewsets

from photobooth import image_filters
from photobooth.gallery.models import Photo
from photobooth.gallery.serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.filter(is_active=True)
    serializer_class = PhotoSerializer

    def filter_image(self, request, filter_name, path):
        string_file = BytesIO()
        image = Image.open(path)
        image = image_filters.get(filter_name)(image)
        image.save(string_file, 'JPEG')
        output = string_file.getvalue()
        response = HttpResponse(content=output)
        response['Content-Type'] = 'image/jpeg'
        return response
