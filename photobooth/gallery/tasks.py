import logging
import time

import requests
from celery import shared_task

logger = logging.getLogger(__name__)


@shared_task
def take_photo():
    import picamera

    logger.info('Starting photo capture')
    with picamera.PiCamera() as camera:
        camera.resolution = (1440, 1080)
        camera.rotation = 270
        camera.start_preview()
        time.sleep(1)
        camera.capture('foo.jpg')
        camera.stop_preview()
        logger.info('Saved image to disk, starting upload')
        files = {'file': open('foo.jpg', 'rb')}
        response = requests.post("http://booth.lkng.me/api/photos/", files=files, data={'is_active': True})

        if response.status_code == 200 or response.status_code == 201:
            logger.info('Upload complete')
        else:
            logger.error(
                'Could not upload image (status code from server: {}'.format(response.status_code),
                extra={'response': response}
            )
