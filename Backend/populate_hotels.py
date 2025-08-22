#!/usr/bin/env python
import os
import django
import sys

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stayeasyhotel.settings')
django.setup()

from api.models import Hotel, Room

def populate_hotels():
    """Populate the database with sample hotel data"""
    
    # Clear existing data
    Hotel.objects.all().delete()
    Room.objects.all().delete()
    
    # Sample hotels data with real images
    hotels_data = [
        {
            'name': 'Grand Palace Hotel',
            'description': 'Luxury hotel in the heart of Manhattan with world-class amenities',
            'location': 'New York, NY',
            'rating': 4.8,
            'amenities': ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking'],
            'image': 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
            'images': [
                'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            'phone': '+1 (555) 123-4567',
            'email': 'reservations@grandpalace.com',
            'address': '123 Fifth Avenue, New York, NY 10001',
            'rooms': [
                {'room_type': 'Standard Room', 'price_per_night': 199.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Mini Bar', 'Coffee Maker'], 'image': 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Deluxe Room', 'price_per_night': 299.00, 'capacity': 3, 'amenities': ['WiFi', 'TV', 'Mini Bar', 'Coffee Maker', 'Balcony'], 'image': 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Executive Suite', 'price_per_night': 499.00, 'capacity': 4, 'amenities': ['WiFi', 'TV', 'Mini Bar', 'Coffee Maker', 'Balcony', 'Living Room'], 'image': 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=400'},
            ]
        },
        {
            'name': 'Seaside Resort',
            'description': 'Beautiful beachfront resort with stunning ocean views',
            'location': 'Miami, FL',
            'rating': 4.6,
            'amenities': ['WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Bar'],
            'image': 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
            'images': [
                'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            'phone': '+1 (555) 234-5678',
            'email': 'info@seasideresort.com',
            'address': '456 Ocean Drive, Miami, FL 33139',
            'rooms': [
                {'room_type': 'Ocean View Room', 'price_per_night': 189.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Ocean View', 'Coffee Maker'], 'image': 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Beachfront Suite', 'price_per_night': 289.00, 'capacity': 4, 'amenities': ['WiFi', 'TV', 'Beach Access', 'Kitchenette', 'Balcony'], 'image': 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Penthouse', 'price_per_night': 589.00, 'capacity': 6, 'amenities': ['WiFi', 'TV', 'Private Pool', 'Full Kitchen', 'Roof Terrace'], 'image': 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=400'},
            ]
        },
        {
            'name': 'Mountain Lodge',
            'description': 'Cozy mountain retreat with breathtaking alpine views',
            'location': 'Aspen, CO',
            'rating': 4.7,
            'amenities': ['WiFi', 'Fireplace', 'Restaurant', 'Ski Access', 'Spa'],
            'image': 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
            'images': [
                'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            'phone': '+1 (555) 345-6789',
            'email': 'stay@mountainlodge.com',
            'address': '789 Mountain Road, Aspen, CO 81611',
            'rooms': [
                {'room_type': 'Mountain View Room', 'price_per_night': 249.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Mountain View', 'Fireplace'], 'image': 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Deluxe Chalet', 'price_per_night': 349.00, 'capacity': 4, 'amenities': ['WiFi', 'TV', 'Fireplace', 'Kitchen', 'Balcony'], 'image': 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Premium Suite', 'price_per_night': 549.00, 'capacity': 6, 'amenities': ['WiFi', 'TV', 'Fireplace', 'Full Kitchen', 'Hot Tub', 'Ski Storage'], 'image': 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=400'},
            ]
        },
        {
            'name': 'City Center Hotel',
            'description': 'Modern hotel in downtown with easy access to attractions',
            'location': 'San Francisco, CA',
            'rating': 4.4,
            'amenities': ['WiFi', 'Restaurant', 'Gym', 'Business Center'],
            'image': 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
            'images': [
                'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            'phone': '+1 (555) 456-7890',
            'email': 'reservations@citycenter.com',
            'address': '321 Market Street, San Francisco, CA 94105',
            'rooms': [
                {'room_type': 'Standard Room', 'price_per_night': 179.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Work Desk', 'Coffee Maker'], 'image': 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Business Room', 'price_per_night': 229.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Work Desk', 'Coffee Maker', 'Printer'], 'image': 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Executive Room', 'price_per_night': 329.00, 'capacity': 3, 'amenities': ['WiFi', 'TV', 'Work Desk', 'Coffee Maker', 'Mini Bar', 'Lounge Access'], 'image': 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=400'},
            ]
        },
        {
            'name': 'Garden Inn',
            'description': 'Peaceful retreat surrounded by beautiful gardens',
            'location': 'Portland, OR',
            'rating': 4.5,
            'amenities': ['WiFi', 'Garden', 'Restaurant', 'Bicycle Rental', 'Yoga Studio'],
            'image': 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
            'images': [
                'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            'phone': '+1 (555) 567-8901',
            'email': 'hello@gardeninn.com',
            'address': '654 Garden Lane, Portland, OR 97205',
            'rooms': [
                {'room_type': 'Garden View Room', 'price_per_night': 159.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Garden View', 'Coffee Maker'], 'image': 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Deluxe Garden Room', 'price_per_night': 219.00, 'capacity': 3, 'amenities': ['WiFi', 'TV', 'Garden View', 'Coffee Maker', 'Balcony'], 'image': 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Premium Suite', 'price_per_night': 349.00, 'capacity': 4, 'amenities': ['WiFi', 'TV', 'Private Garden', 'Kitchenette', 'Fireplace'], 'image': 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=400'},
            ]
        },
        {
            'name': 'Desert Oasis',
            'description': 'Luxury resort in the heart of the desert with stunning views',
            'location': 'Phoenix, AZ',
            'rating': 4.9,
            'amenities': ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Golf Course', 'Tennis Courts'],
            'image': 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800',
            'images': [
                'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800'
            ],
            'phone': '+1 (555) 678-9012',
            'email': 'reservations@desertoasis.com',
            'address': '987 Desert Road, Phoenix, AZ 85001',
            'rooms': [
                {'room_type': 'Desert View Room', 'price_per_night': 279.00, 'capacity': 2, 'amenities': ['WiFi', 'TV', 'Desert View', 'Coffee Maker'], 'image': 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Luxury Suite', 'price_per_night': 429.00, 'capacity': 4, 'amenities': ['WiFi', 'TV', 'Private Pool', 'Kitchen', 'Balcony'], 'image': 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=400'},
                {'room_type': 'Presidential Suite', 'price_per_night': 799.00, 'capacity': 6, 'amenities': ['WiFi', 'TV', 'Private Pool', 'Full Kitchen', 'Butler Service', 'Private Gym'], 'image': 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=400'},
            ]
        }
    ]

    # Create hotels and rooms
    for hotel_data in hotels_data:
        rooms_data = hotel_data.pop('rooms')
        hotel = Hotel.objects.create(**hotel_data)
        
        for room_data in rooms_data:
            Room.objects.create(hotel=hotel, **room_data)
        
        print(f"Created hotel: {hotel.name} with {len(rooms_data)} rooms")

    print("Database populated successfully!")

if __name__ == '__main__':
    populate_hotels()
