from django.urls import path
from .views import api_list_technician, api_show_technician, api_list_appointments


urlpatterns = [
    path(
        'technicians/',
        api_list_technician,
        name='list_technicians',
    ),
    path('technicians/<int:pk>/', api_show_technician, name='show_technician'),
    path('appointments/', api_list_appointments, name='list_appointments'),
]
