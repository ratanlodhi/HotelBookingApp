import React from 'react';
import { Link } from 'react-router-dom';
import { 
  
  Shield, 
 
  Heart, 
  Globe, 
  TrendingUp,
} from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9r04s5NLqpN_uINsHgAqGcACes4nYntb_w&s",
      bio: "10+ years in hospitality industry, passionate about creating seamless travel experiences."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Tech innovator focused on building scalable platforms that enhance user experiences."
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Dedicated to ensuring every guest has a memorable and hassle-free booking experience."
    }
  ];

  const stats = [
    { number: "500K+", label: "Happy Customers" },
    { number: "10K+", label: "Hotels Worldwide" },
    { number: "50+", label: "Countries Served" },
    { number: "4.9/5", label: "Customer Rating" }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer First",
      description: "We prioritize our customers' needs and experiences above everything else."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Security",
      description: "Your data and bookings are protected with enterprise-grade security."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Reach",
      description: "Access to hotels worldwide with local expertise and support."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Continuous Innovation",
      description: "Constantly improving our platform to deliver better experiences."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About stayeasyhotel
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Making travel booking simple, secure, and enjoyable for everyone
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At stayeasyhotel, we believe that finding the perfect accommodation should be as 
                enjoyable as the journey itself. Founded in 2020, we've been on a mission to 
                revolutionize the way people book hotels worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We connect travelers with exceptional hotels, offering seamless booking 
                experiences, competitive prices, and unparalleled customer service. Our 
                platform combines cutting-edge technology with deep industry expertise to 
                ensure every stay exceeds expectations.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind stayeasyhotel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-70 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-12">
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">2020</h3>
                    <p className="text-gray-600">stayeasyhotel Founded</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 text-left pl-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">2021</h3>
                    <p className="text-gray-600">Expanded to 50+ countries</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 text-right pr-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">2022</h3>
                    <p className="text-gray-600">Reached 100K+ customers</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 pl-8"></div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10"></div>
                <div className="flex-1 text-left pl-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">2023</h3>
                    <p className="text-gray-600">Launched mobile app</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Story
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of the stayeasyhotel community and experience travel booking like never before
          </p>
          <Link
            to="/hotels"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
