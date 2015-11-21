import json
import os

import redis
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
    def preview(self):
        return get_thumbnail(os.path.join(settings.MEDIA_ROOT, self.file.name), '1400')

    @property
    def image(self):
        return self.file

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        from photobooth.gallery.serializers import PhotoSerializer
        client = redis.StrictRedis(host='localhost', port=6379, db=0)
        client.publish('photobooth', json.dumps({'photo': PhotoSerializer(self).data}))
