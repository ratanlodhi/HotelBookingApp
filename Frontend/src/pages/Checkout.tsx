import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import PaymentForm from '../components/PaymentForm';
import { bookingsAPI, paymentsAPI } from '../services/api';

const Checkout: React.FC = () => {
  const { bookingData, clearBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!bookingData.hotel || !bookingData.room || !bookingData.checkIn || !bookingData.checkOut) {
      navigate('/hotels');
    }
  }, [bookingData, navigate]);

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const startDate = new Date(bookingData.checkIn);
      const endDate = new Date(bookingData.checkOut);
      return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handlePayment = async (paymentData: any) => {
    setLoading(true);
    setError('');

    try {
      // Create booking first
      const bookingPayload = {
        hotel: bookingData.hotel!.id,
        room: bookingData.room!.id,
        check_in: bookingData.checkIn,
        check_out: bookingData.checkOut,
        guests: bookingData.guests,
        total_price: bookingData.totalPrice,
        status: 'confirmed',
      };

      const bookingResponse = await bookingsAPI.createBooking(bookingPayload);

      // Process payment (in a real app, you'd integrate with Stripe/Razorpay)
      const paymentPayload = {
        booking_id: bookingResponse.data.id,
        amount: bookingData.totalPrice,
        payment_method: 'card',
        card_details: {
          number: paymentData.cardNumber,
          expiry: paymentData.expiryDate,
          cvv: paymentData.cvv,
          name: paymentData.cardholderName,
        },
        billing_address: paymentData.billingAddress,
      };

      await paymentsAPI.confirmPayment(paymentPayload);

      setSuccess(true);
      setTimeout(() => {
        clearBooking();
        navigate('/profile');
      }, 3000);

    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData.hotel || !bookingData.room) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your reservation at {bookingData.hotel.name} has been successfully confirmed.
          </p>
          <p className="text-sm text-gray-500">
            You will be redirected to your profile to view booking details...
          </p>
        </div>
      </div>
    );
  }

  const nights = calculateNights();
  const totalPrice = nights * bookingData.room.price_per_night;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Payment</h1>
          <p className="text-gray-600">Secure checkout for your hotel reservation</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <PaymentForm
              totalAmount={totalPrice}
              onSubmit={handlePayment}
              loading={loading}
            />
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="mb-4">
                <img
                  src={bookingData.hotel.image}
                  alt={bookingData.hotel.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-800">{bookingData.hotel.name}</h4>
                <p className="text-gray-600 text-sm">{bookingData.hotel.location}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Room</span>
                  <span>{bookingData.room.room_type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-in</span>
                  <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Check-out</span>
                  <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nights</span>
                  <span>{nights}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guests</span>
                  <span>{bookingData.guests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per night</span>
                  <span>${bookingData.room.price_per_night}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;