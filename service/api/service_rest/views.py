from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
from .models import AutomobileVO, Technician, Appointment
# Create your views here.


class AutomobileVODetailedEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'id',
        'vin',
        'year',
        'color'
    ]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = [
        'first_name',
        'last_name',
        'employee_id',
        'id'
    ]

class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'vin',
        'customer',
        'date',
        'time',
        'reason',
        'status',
        'vip',
        'canceled',
        'finished',
        'technician'
        'id'
    ]
    encoders = {
        'automobile': AutomobileVODetailedEncoder(),
        'technician': TechnicianDetailEncoder(),
    }

    def get_extra_data(self, o):
        if isinstance(o.date, str) and isinstance(o.time, str):
            return {
                'date': o.date,
                'time': o.time,
            }
        else:
            return {
                'date': o.date.isoformat(),
                'time': o.time.isoformat(),
            }

@require_http_methods(['GET', 'POST'])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {'message': 'could not create the technician'},
                status=400,
            )

@require_http_methods(['GET', 'DELETE', 'PUT'])
def api_show_technician(request, pk):
    if request.method == 'GET':
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {'message': 'could not get the technician'},
                status=404,
            )
    elif request.method == 'DELETE':
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({'deleted': count > 0})
    else:
        content = json.loads(request.body)
        print('content :', content)
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=pk)

            props = ['employee_id', 'first_name', 'last_name']
            for prop in props:
                if prop in content:
                    setattr(technician, prop, content[prop])
            technician.save()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {'message': 'technician does not exist'},
                status=404,
            )

@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == 'GET':
        appointment = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointment},
            encoder=AppointmentDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content['technician_id'])
            content['technician'] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": 'technician id incorrect'},
                status=400,
            )
