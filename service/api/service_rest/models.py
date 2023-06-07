from django.db import models

from django.urls import reverse

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    def get_api_url(self):
        return reverse('api_show_technician', kwargs={'pk': self.id})

    def __str__(self):
        return f'{self.first_name} | {self.last_name} | {self.employee_id}'

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    year = models.PositiveSmallIntegerField(null=True)
    color = models.CharField(max_length=50, default='N/A')

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"pk": self.id})


class Appointment(models.Model):
    vin = models.CharField(max_length=50)
    customer = models.TextField(max_length=50)
    date = models.DateField(max_length=30, blank=True, null=True)
    time = models.TimeField(max_length=30, blank=True, null=True)
    reason = models.TextField()
    status = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    canceled = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
    technician = models.ForeignKey(
        AutomobileVO,
        related_name='appointments',
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse('api_show_appointment', kwargs={'pk': self.id})
