import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'photobooth.settings')

from django.conf import settings  # isort:skip

app = Celery('photobooth')

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

if hasattr(settings, 'RAVEN_CONFIG'):
    from raven import Client  # isort:skip
    from raven.contrib.celery import register_signal  # isort:skip
    client = Client(dsn=settings.RAVEN_CONFIG['dsn'])
    register_signal(client)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
