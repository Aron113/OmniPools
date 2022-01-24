from django.db import models

# Create your models here.

class Proposal(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='Static/images', db_column='image', null=True, blank=True, default="Static/images/placeholder.png")
    created_at = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(decimal_places=2, max_digits=15, null=True, blank=True)
