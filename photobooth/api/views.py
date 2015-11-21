from rest_framework import viewsets

from photobooth.gallery.models import Photo
from photobooth.gallery.serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.filter(is_active=True)
    serializer_class = PhotoSerializer

