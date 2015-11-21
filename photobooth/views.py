from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import TemplateView


class LandingPage(TemplateView):
    template_name = 'index.html'


class Remote(LoginRequiredMixin, TemplateView):
    template_name = 'remote.html'
