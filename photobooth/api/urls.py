from rest_framework import routers

from photobooth.api.views import PhotoViewSet

router = routers.DefaultRouter()
router.register(r'photos', PhotoViewSet)
