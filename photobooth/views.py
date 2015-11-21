from django.views.generic.base import TemplateView


class LandingPage(TemplateView):
    template_name = 'index.html'


class Remote(TemplateView):
    template_name = 'remote.html'
