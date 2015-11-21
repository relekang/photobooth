from io import BytesIO

from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework.views import APIView

from photobooth import image_filters
from photobooth.gallery import tasks as photo_tasks
from photobooth.gallery.models import Photo
from photobooth.gallery.serializers import PhotoSerializer

try:
    from PIL import Image
except ImportError:
    Image = None


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer

    def get_queryset(self):
        return Photo.objects.filter(is_active=True)

    def filter_image(self, request, filter_name, path):
        string_file = BytesIO()
        image = Image.open(path)
        image = image_filters.get(filter_name)(image)
        image.save(string_file, 'JPEG')
        output = string_file.getvalue()
        response = HttpResponse(content=output)
        response['Content-Type'] = 'image/jpeg'
        return response


class TakePhotoView(APIView):
    def post(self, request):
        photo_tasks.take_photo.delay()

        return JsonResponse({'message': 'Photo will be taken'}, status=202)
