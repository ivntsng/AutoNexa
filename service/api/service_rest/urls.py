from django.urls import path
from .views import api_list_technician


urlpatterns = [
    path(
        'technicians/',
        api_list_technician,
        name='list_technicians',
    ),
]
