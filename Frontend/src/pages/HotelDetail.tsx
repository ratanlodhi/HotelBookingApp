import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, Phone, Mail, Users } from 'lucide-react';
import { hotelsAPI, roomsAPI } from '../services/api';
import { useBooking } from '../context/BookingContext';
import RoomCard from '../components/RoomCard';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price_per_night: number;
  image: string;
  description: string;
  amenities: string[];
  phone: string;
  email: string;
  address: string;
  images: string[];
}

interface Room {
  id: number;
  hotel: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  available: boolean;
  image?: string;
}

const HotelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { setSelectedHotel, setSelectedRoom } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchHotelDetails();
      fetchHotelRooms();
    }
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      const response = await hotelsAPI.getHotel(parseInt(id!));
      setHotel(response.data);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      // Don't use mock data anymore - show error state instead
      setHotel(null);
    }
  };

  const fetchHotelRooms = async () => {
    try {
      const response = await roomsAPI.getRooms(parseInt(id!));
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching hotel rooms:', error);
      // Don't use mock data anymore - show empty rooms
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const handleRoomSelect = (room: Room) => {
    if (hotel) {
      setSelectedHotel(hotel);
      setSelectedRoom(room);
      navigate('/booking');
    }
  };

  if (loading || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hotel Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={hotel.images?.[selectedImageIndex] || hotel.image}
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            
            {hotel.images && hotel.images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${hotel.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-blue-500 opacity-100'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{hotel.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{hotel.rating}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{hotel.description}</p>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">{hotel.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">{hotel.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-gray-700">{hotel.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hotel.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
              >
                {getAmenityIcon(amenity)}
                <span className="text-gray-700 text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Rooms */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Rooms</h2>
          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onSelect={handleRoomSelect}
                  showSelectButton={true}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No rooms available
              </h3>
              <p className="text-gray-500">
                Please check back later or contact the hotel directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;