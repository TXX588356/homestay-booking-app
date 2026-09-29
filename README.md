# Homestay Booking App

A mobile homestay booking application built with **React Native and TypeScript**. The app provides an end-to-end accommodation browsing and booking flow, including account management, property discovery, wishlists, booking history, simulated payment, theming, and real-time customer support.

## Features

### Authentication & Account Management
- Register and log in with locally stored user accounts.
- Persist the currently signed-in user with AsyncStorage.
- Update profile information such as name and phone number.
- Change account password.
- Delete an account.
- Password recovery flow.
- Light/dark theme support.

### Property Discovery
- Browse homestays by category:
  - Beach
  - Mountain
  - City
  - Camping
  - Pool
- View recommended properties.
- Open detailed property information.
- Browse property images using reusable carousel/card components.
- Open property locations using map integration.

### Booking
- Select check-in and check-out dates.
- Choose the number of guests.
- Review booking details before confirmation.
- Select a simulated payment method.
- Validate payment form input.
- Store completed bookings through a REST API.
- View previous trips and booking details.

### Wishlist
- Add properties to a personal wishlist.
- Remove saved properties.
- Retrieve wishlisted properties for the signed-in user.
- Persist wishlist data through a REST API backed by SQLite.

### Customer Support
- Real-time chat between the mobile client and support interface.
- Implemented with **Socket.IO** and a Python Flask-SocketIO server.
- Messages are broadcast between connected clients in real time.

## Architecture

The project combines a React Native client with lightweight Python services:

```text
React Native App
│
├── Local SQLite
│   └── User authentication and account data
│
├── AsyncStorage
│   └── Current user/session information
│
├── Booking REST API
│   └── Flask + SQLite
│
├── Wishlist REST API
│   └── Flask + SQLite
│
└── Live Chat
    └── Flask-SocketIO + Socket.IO client
```

The application uses separate service endpoints for bookings, wishlists, and live chat.

## Tech Stack

| Area | Technology |
| --- | --- |
| Mobile | React Native 0.73 |
| Language | TypeScript |
| UI | React Native Paper |
| Navigation | React Navigation |
| Local Storage | AsyncStorage |
| Local Database | SQLite |
| Backend Services | Python, Flask |
| Real-time Communication | Socket.IO / Flask-SocketIO |
| Database | SQLite |
| Testing | Jest |
| Code Quality | ESLint, Prettier |

## Project Structure

```text
Auth/
├── App.tsx
├── Login.tsx
└── WelcomeScreen.tsx

Drawer/
├── AccountSettingScreen.tsx
├── CustomerSupport.tsx
├── ProfileScreen.tsx
├── SettingScreen.tsx
└── SettingsStackNavigator.tsx

Tab/
├── HomeStack/
│   ├── HomeScreen.tsx
│   ├── CategoryScreen.tsx
│   ├── PropertyDetailsScreen.tsx
│   ├── BookingScreen.tsx
│   ├── ReviewBookingScreen.tsx
│   └── PaymentMethodScreen.tsx
├── TripStack/
│   ├── TripScreen.tsx
│   └── TripDetails.tsx
└── WishlistScreen.tsx

components/              # Reusable UI components
python/                  # Flask APIs, Socket.IO server and SQLite database
db-service.ts            # Local user SQLite operations
allProperties.json       # Property catalogue
config.js                # Backend service addresses
Types.ts                 # Navigation type definitions
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js 18+
- npm
- React Native development environment
- Android Studio for Android development
- Xcode for iOS development on macOS
- Python 3
- pip

Follow the official React Native environment setup for the platform you intend to use.

## 1. Clone the repository

```bash
git clone https://github.com/TXX588356/homestay-booking-app.git
cd homestay-booking-app
```

## 2. Install JavaScript dependencies

```bash
npm install
```

## 3. Install Python service dependencies

The backend utilities use Flask and Flask-SocketIO.

```bash
pip install flask flask-socketio
```

## 4. Prepare the service database

The project already contains `python/Airbnb.sqlite`. To recreate the booking and wishlist tables:

```bash
cd python
python createdb.py
```

> Running `createdb.py` drops and recreates the existing `wishlist` and `bookings` tables.

Remain inside the `python/` directory when starting the Python services because they access `Airbnb.sqlite` using a relative path.

## 5. Start the backend services

Open separate terminals and run the following commands from the `python/` directory.

### Live chat server

```bash
python livechatServer.py
```

Default port:

```text
5000
```

### Booking API

```bash
python bookingServer.py
```

Default port:

```text
5001
```

### Wishlist API

```bash
python wishlistServer.py
```

Default port:

```text
5002
```

## 6. Configure service addresses

The mobile app reads backend addresses from `config.js`.

The default configuration is:

```js
livechatServerPath: 'http://10.0.2.2:5000'
bookingServerPath: 'http://10.0.2.2:5001'
wishlistServerPath: 'http://10.0.2.2:5002'
```

`10.0.2.2` is the Android Emulator address used to access services running on the host computer.

If you run the application on a physical device, replace `10.0.2.2` with the development machine's local network IP address and ensure both devices are on the same network.

## 7. Start Metro

Return to the repository root and run:

```bash
npm start
```

Keep Metro running in its own terminal.

## 8. Run the application

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Application Flow

```text
Welcome / Login
      ↓
Main Application
      ↓
Browse Categories / Recommendations
      ↓
Property Details
      ├── Add to Wishlist
      └── Book Property
              ↓
        Select Dates & Guests
              ↓
        Review Booking
              ↓
        Payment Method
              ↓
        Booking Stored
              ↓
        Trip History
```

Users can also access profile management, settings, theme controls, wishlists, and real-time customer support through the application's navigation.

## Data Storage

The project uses two SQLite-based storage approaches.

### User Data

`db-service.ts` uses `react-native-sqlite-storage` for local user data such as:

- Name
- Email
- Password
- Phone number

AsyncStorage is used to keep the current signed-in user's information available across screens.

### Booking & Wishlist Data

The Python services use `python/Airbnb.sqlite`.

The main tables are:

- `bookings`
- `wishlist`

The mobile application communicates with these tables through Flask REST endpoints rather than accessing the database directly.

## REST Services

### Booking API

The booking service supports:

```text
GET  /api/bookingHistory
GET  /api/bookingHistory/user/:userId
POST /api/bookingHistory
```

### Wishlist API

The wishlist service supports:

```text
GET    /api/wishlist/user/:userId
GET    /api/wishlist/user/:userId/property/:propertyId
POST   /api/wishlist
DELETE /api/wishlist
```

## Development Notes

This project is intended as an academic / learning application.

The authentication database is local to the mobile application, and passwords are stored directly in SQLite as part of the project implementation. A production application should instead use secure server-side authentication and password hashing.

The payment screen performs form validation and records the selected payment method for demonstration purposes. It does **not** connect to a real payment gateway and should not be used to process real payment information.

The backend consists of lightweight development services rather than a production deployment architecture.

## Available Commands

```bash
npm start          # Start Metro
npm run android    # Run Android application
npm run ios        # Run iOS application
npm run lint       # Run ESLint
npm test           # Run Jest tests
```

## License

This project was developed as an academic / learning project.
