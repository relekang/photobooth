from django.conf.urls import url, include
from rest_framework import routers
from photobooth.api.views import PhotoViewSet

router = routers.DefaultRouter()
router.register(r'photos', PhotoViewSet)

urlpatterns = [
    url(
        r'photo/(?P<filter_name>[a-z]+)/(?P<path>.+)$',
        PhotoViewSet.as_view({'get': 'filter_image'}),
        name='filter_image'
    ),
    url(r'^', include(router.urls)),
]
