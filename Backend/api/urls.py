from django.urls import path
from .views import HotelList, HotelDetail, RoomList, RoomDetail, BookingList, BookingDetail, RegisterView, UserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name="register"),
    path('auth/login/', views.login_view, name="login"),
    path('auth/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('auth/user/', UserView.as_view(), name="user"),
    
    # Function-based views as requested (keeping for backward compatibility)
    path('register/', views.register_view, name="register_view"),
    path('login/', views.login_view, name="login_view"),

    path('hotels/', HotelList.as_view()),
    path('hotels/<int:pk>/', HotelDetail.as_view()),

    path('rooms/', RoomList.as_view()),
    path('rooms/<int:pk>/', RoomDetail.as_view()),

    path('bookings/', BookingList.as_view()),
    path('bookings/<int:pk>/', BookingDetail.as_view()),
]
