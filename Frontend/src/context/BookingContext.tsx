import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price_per_night: number;
  image: string;
  description: string;
}

interface Room {
  id: number;
  hotel: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  available: boolean;
}

interface BookingData {
  hotel: Hotel | null;
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
}

interface BookingContextType {
  bookingData: BookingData;
  setSelectedHotel: (hotel: Hotel) => void;
  setSelectedRoom: (room: Room) => void;
  setBookingDates: (checkIn: string, checkOut: string) => void;
  setGuests: (guests: number) => void;
  calculateTotalPrice: () => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    hotel: null,
    room: null,
    checkIn: '',
    checkOut: '',
    guests: 1,
    totalPrice: 0,
  });

  const setSelectedHotel = (hotel: Hotel) => {
    setBookingData(prev => ({ ...prev, hotel }));
  };

  const setSelectedRoom = (room: Room) => {
    setBookingData(prev => ({ ...prev, room }));
    calculateTotalPrice();
  };

  const setBookingDates = (checkIn: string, checkOut: string) => {
    setBookingData(prev => ({ ...prev, checkIn, checkOut }));
    calculateTotalPrice();
  };

  const setGuests = (guests: number) => {
    setBookingData(prev => ({ ...prev, guests }));
  };

  const calculateTotalPrice = () => {
    const { room, checkIn, checkOut } = bookingData;
    if (room && checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = room.price_per_night * nights;
      setBookingData(prev => ({ ...prev, totalPrice }));
    }
  };

  const clearBooking = () => {
    setBookingData({
      hotel: null,
      room: null,
      checkIn: '',
      checkOut: '',
      guests: 1,
      totalPrice: 0,
    });
  };

  const value = {
    bookingData,
    setSelectedHotel,
    setSelectedRoom,
    setBookingDates,
    setGuests,
    calculateTotalPrice,
    clearBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};