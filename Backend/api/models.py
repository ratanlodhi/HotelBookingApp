from django.db import models
from django.contrib.auth.models import User

class Hotel(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    rating = models.FloatField(default=0)
    amenities = models.JSONField(default=list)
    image = models.URLField(max_length=500, blank=True, null=True)
    images = models.JSONField(default=list, blank=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, related_name="rooms", on_delete=models.CASCADE)
    room_type = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    capacity = models.IntegerField(default=2)
    amenities = models.JSONField(default=list, blank=True)
    image = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.hotel.name} - {self.room_type}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=20, default="pending")
    payment_status = models.CharField(max_length=20, default="unpaid")

    def __str__(self):
        return f"Booking by {self.user.username} at {self.room.hotel.name}"
