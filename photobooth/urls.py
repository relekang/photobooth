from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from . import views

admin.site.site_header = 'Photobooth'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('photobooth.api.urls')),
    url(r'^accounts/', include('django.contrib.auth.urls')),
    url(r'^remote/$', views.Remote.as_view()),
    url(r'^$', views.LandingPage.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
