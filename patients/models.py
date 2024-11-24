from django.db import models

# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    address = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)