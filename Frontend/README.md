# Project Title: StayEasyHotel

## Description
StayEasyHotel is a full-stack hotel management application that allows users to book hotels, manage reservations, and process payments. The application is built using Django for the backend and React with TypeScript for the frontend.

## Installation Instructions

### Backend
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install the required packages:
   ```bash
   npm install
   ```

## Usage

### Backend
To run the backend server, use:
```bash
python manage.py runserver
```

### Frontend
To run the frontend development server, use:
```bash
npm run dev
```

## API Endpoints
- **GET /api/hotels/**: Retrieve a list of hotels.
- **POST /api/book/**: Create a new booking.
- **GET /api/bookings/**: Retrieve a list of bookings.

## Frontend Development Instructions
- Use Vite for development and build processes.
- Run `npm run build` to create a production build.

## License
This project is licensed under the MIT License.
