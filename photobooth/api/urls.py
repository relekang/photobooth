from django.conf.urls import include, url
from rest_framework import routers

from photobooth.api.views import PhotoViewSet, TakePhotoView

router = routers.DefaultRouter()
router.register(r'photos', PhotoViewSet, base_name='photo')

urlpatterns = [
    url(
        r'photos/(?P<filter_name>[a-z]+)/(?P<path>.+)$',
        PhotoViewSet.as_view({'get': 'filter_image'}),
        name='filter_image'
    ),
    url(r'photos/take/', TakePhotoView.as_view(), name='take_photo'),
    url(r'^', include(router.urls)),
]
