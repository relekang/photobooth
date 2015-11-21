from basis.models import TimeStampModel
from django.db import models


class Photo(TimeStampModel):
    file = models.ImageField(upload_to='photos')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.created_at
