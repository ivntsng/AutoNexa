from django.urls import path
from .views import api_list_technician, api_show_technician, api_list_appointments, api_show_appointments, api_update_appointment_status


urlpatterns = [
    path(
        'technicians/',
        api_list_technician,
        name='list_technicians',
    ),
    path('technicians/<int:pk>/', api_show_technician, name='show_technician'),
    path('appointments/', api_list_appointments, name='list_appointments'),
    path('appointments/<int:pk>/', api_show_appointments, name='show_appointment'),
    path('appointments/<int:pk>/finish/', api_update_appointment_status, name='finish_appointment'),
    path('appointments/<int:pk>/cancel/', api_update_appointment_status, name='cancel_appointment'),
]
