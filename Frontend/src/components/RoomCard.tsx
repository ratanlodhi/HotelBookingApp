import React from 'react';
import { Users, Wifi, Car, Coffee, Star } from 'lucide-react';

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

interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
  showSelectButton?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  onSelect, 
  showSelectButton = true 
}) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={room.image || `https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400`}
          alt={room.room_type}
          className="w-full h-48 object-cover"
        />
        {!room.available && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Not Available</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{room.room_type}</h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">
              ${room.price_per_night}
            </span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-gray-600">Up to {room.capacity} guests</span>
        </div>
        
        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 4).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {room.amenities.length > 4 && (
                <span className="text-sm text-gray-500">
                  +{room.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {showSelectButton && onSelect && (
          <button
            onClick={() => onSelect(room)}
            disabled={!room.available}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              room.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {room.available ? 'Select Room' : 'Not Available'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;