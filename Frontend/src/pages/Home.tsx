import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Award, Users, Shield } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { hotelsAPI } from '../services/api';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price_per_night: number;
  image: string;
  description: string;
}

const Home: React.FC = () => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedHotels();
  }, []);

  const fetchFeaturedHotels = async () => {
    try {
      const response = await hotelsAPI.getHotels({ featured: true, limit: 6 });
      console.log('Featured hotels API response:', response.data);
      
      // Add default images to hotels if they don't have them
      const hotelsWithImages = (response.data || []).map((hotel: any, index: number) => ({
        ...hotel,
        image: hotel.image || getDefaultHotelImage(index)
      }));
      
      setFeaturedHotels(hotelsWithImages);
    } catch (error: any) {
      console.error('Error fetching featured hotels:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      // Only use mock data if we get a specific error (like 404 or network error)
      // but not for authentication errors (401/403)
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.error('Authentication error - cannot fetch featured hotels');
        setFeaturedHotels([]);
      } else {
        // Mock data for development when API is not available
        console.log('Using mock data for development');
        setFeaturedHotels([
          {
            id: 1,
            name: "Grand Palace Hotel",
            location: "New York, NY",
            rating: 4.8,
            price_per_night: 299,
            image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Luxury hotel in the heart of Manhattan"
          },
          {
            id: 2,
            name: "Seaside Resort",
            location: "Miami, FL",
            rating: 4.6,
            price_per_night: 189,
            image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Beautiful beachfront resort with ocean views"
          },
          {
            id: 3,
            name: "Mountain Lodge",
            location: "Aspen, CO",
            rating: 4.7,
            price_per_night: 349,
            image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: "Cozy mountain retreat with stunning views"
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData: any) => {
    navigate('/hotels', { state: { searchParams: searchData } });
  };

  // Function to get default hotel images
  const getDefaultHotelImage = (index: number): string => {
    const defaultImages = [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800"
    ];
    return defaultImages[index % defaultImages.length];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover amazing hotels around the world with the best prices and premium service
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <BookingForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose StayEasy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make hotel booking simple, secure, and rewarding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Best Price Guarantee
              </h3>
              <p className="text-gray-600">
                Find a lower price? We'll match it and give you an additional 10% off.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure Booking
              </h3>
              <p className="text-gray-600">
                Your personal and payment information is always protected with bank-level security.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Our customer service team is available around the clock to help you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Featured Hotels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium hotels
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => navigate(`/hotels/${hotel.id}`)}
                >
                  <div className="relative">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {hotel.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${hotel.price_per_night}
                        </span>
                        <span className="text-gray-500 text-sm">/night</span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust StayEasy for their accommodation needs
          </p>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Explore Hotels
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;