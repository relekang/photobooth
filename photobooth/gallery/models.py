import os

from basis.models import TimeStampModel
from django.db import models
from thumbnails import get_thumbnail, settings


class Photo(TimeStampModel):
    file = models.FileField(upload_to='photos')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.created_at

    @property
    def thumbnail(self):
        return get_thumbnail(os.path.join(settings.MEDIA_ROOT, self.file.name), '300')

    @property
    def image(self):
        return self.file
