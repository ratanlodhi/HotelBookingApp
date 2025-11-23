import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';

const Booking: React.FC = () => {
  const { bookingData, setBookingDates, setGuests, calculateTotalPrice } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookingFormData, setBookingFormData] = useState({
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    guests: bookingData.guests,
  });

  useEffect(() => {
    if (!bookingData.hotel || !bookingData.room) {
      navigate('/hotels');
    }
  }, [bookingData, navigate]);

  // Removed useEffect that causes infinite loop by calling calculateTotalPrice on every render
  // useEffect(() => {
  //   calculateTotalPrice();
  // }, [bookingFormData, calculateTotalPrice]);

  const handleBookingUpdate = (data: any) => {
    setBookingFormData({
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
    });
    setBookingDates(data.checkIn, data.checkOut);
    setGuests(data.guests);
  };

  const calculateNights = () => {
    if (bookingFormData.checkIn && bookingFormData.checkOut) {
      const startDate = new Date(bookingFormData.checkIn);
      const endDate = new Date(bookingFormData.checkOut);
      return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleProceedToCheckout = () => {
    if (!bookingFormData.checkIn || !bookingFormData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    navigate('/checkout');
  };

  if (!bookingData.hotel || !bookingData.room) {
    return null;
  }

  const nights = calculateNights();
  const totalPrice = nights * bookingData.room.price_per_night;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Review your selection and confirm your reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hotel & Room Info */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={bookingData.hotel.image}
                    alt={bookingData.hotel.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {bookingData.hotel.name}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{bookingData.hotel.location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{bookingData.hotel.rating}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {bookingData.room.room_type}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Up to {bookingData.room.capacity} guests</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bookingData.room.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h3>
              <BookingForm
                onSearch={handleBookingUpdate}
                initialData={{
                  location: '',
                  checkIn: bookingFormData.checkIn,
                  checkOut: bookingFormData.checkOut,
                  guests: bookingFormData.guests,
                }}
                showLocationField={false}
              />
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Guest Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={user?.first_name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={user?.last_name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-medium">{bookingData.room.room_type}</span>
                </div>
                
                {bookingFormData.checkIn && bookingFormData.checkOut && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-medium">
                        {new Date(bookingFormData.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-medium">
                        {new Date(bookingFormData.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nights</span>
                      <span className="font-medium">{nights}</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{bookingFormData.guests}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per night</span>
                  <span className="font-medium">${bookingData.room.price_per_night}</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                </div>
                {nights > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    ${bookingData.room.price_per_night} × {nights} nights
                  </p>
                )}
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                disabled={!bookingFormData.checkIn || !bookingFormData.checkOut}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  bookingFormData.checkIn && bookingFormData.checkOut
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;