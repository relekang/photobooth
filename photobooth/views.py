from django.views.generic.base import TemplateView


class LandingPage(TemplateView):
    template_name = 'index.html'
