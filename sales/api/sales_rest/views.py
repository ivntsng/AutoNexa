from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Salesperson, Customer,AutomobileVO, Sale
import json

class SalesPersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }

# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder = SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salespersons = Salesperson.objects.create(**content)
            return JsonResponse(
                salespersons,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Information"},
                status=400,
            )
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder = SalesPersonEncoder,
            safe = False,
        )


@require_http_methods(["GET", "DELETE"])
def api_salespeople_detail(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                {"salesperson": salesperson},
                encoder = SalesPersonEncoder,
                safe = False
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "This salesperson doesn't exist."},
                status = 400
            )
    else:
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )



@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder = CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            customers = Customer.objects.create(**content)
            return JsonResponse(
                customers,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Information"},
                status=400,
            )
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder = CustomerEncoder,
            safe = False,
        )


@require_http_methods(["GET", "DELETE"])
def api_customer_detail(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                {"customer": customer},
                encoder = CustomerEncoder,
                safe = False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "This customer doesn't exist."},
                status = 400
            )
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder = SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            content_customer = content["customer"]
            customer = Customer.objects.get(first_name=content_customer)
            content['customer'] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer doesn't exist."},
                status = 400,
            )
        try:
            content_salesperson = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=content_salesperson)
            content['salesperson'] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson doesn't exist."},
                status = 400,
            )
        try:
            content_automobile = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=content_automobile)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile doesn't exist"},
                status = 400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,

        )
