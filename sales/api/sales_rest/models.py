from django.db import models

# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.first_name} + ' ' + {self.last_name}"



class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} + ' ' + {self.last_name}"



class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200, unique=True)
    sold = models.CharField(default=False)

    def __str__(self):
        return f"{self.import_href}"



class Sale(models.Model):
    price = models.PositiveBigIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.salesperson} {self.customer} {self.automobile}"
