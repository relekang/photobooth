import time
import picamera
import requests
from celery import shared_task

@shared_task
def take_picture():
    with picamera.PiCamera() as camera:
        camera.resolution = (2592, 1944)
        camera.start_preview()
        time.sleep(1)
        camera.capture('foo.jpg')
        camera.stop_preview()
        files = {'file': open('foo.jpg', 'rb')}
        response = requests.post("http://booth.lkng.me/api/photos/", files=files)
        print(response.status_code)
        print(response.text)
