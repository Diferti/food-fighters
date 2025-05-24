# FoodFighters 🍽️

An AI-powered gamified nutrition app that that transforms nutrition from a chore into a game, making healthy eating accessible, engaging, and community-driven. FoodFighters combines the power of artificial intelligence with gamification to help users make better food choices while having fun.

## Features 🌟

### Core Features
- **AI-Powered Meal Analysis**
  - Instant photo analysis of meals
  - Detailed nutrition breakdown (calories, proteins, carbs, fat, fiber)
  - Product identification with weight measurements
  - Personalized diet plan generation

### Gamification Elements
- **Dual Currency System**
  - Gems: Used for ranking and competition
  - Coins: Spendable currency for in-app purchases
- **Competitive Features**
  - Leaderboards
  - League tiers
  - Ranking system
- **Reward System**
  - Pet fighters (collectible and upgradeable)
  - Real-world rewards
    - Grocery store discounts
    - Food delivery coupons
- **Diet Plan Integration**
  - Personalized diet plans based on:
    - User preferences
    - Health goals
    - Dietary restrictions
  - Double points for following diet plan

## Technologies Used 🛠️

### Frontend
- **React Native**: Core framework for mobile app development
- **Expo**: Development platform and build tools
- **TypeScript**: Type-safe programming language
- **NativeWind**: Tailwind CSS for React Native
- **Expo Router**: File-based routing for React Native
- **React Navigation**: Navigation library

### Backend & AI
- **Node.js & Express**: Core server framework
- **MongoDB & Mongoose**: Database for user data and meal history
- **OpenAI API**: AI-powered meal analysis and diet plan generation
- **JWT Authentication**: Secure user authentication
- **Swagger/OpenAPI**: API documentation
- **Multer**: File upload handling for meal images

### Additional Features
- **Expo Camera**: Camera functionality for meal photos
- **Expo Image Picker**: Image selection from gallery
- **Expo Font**: Custom font loading
- **React Native Reanimated**: Advanced animations
- **React Native Gesture Handler**: Gesture handling

## Prerequisites 📋

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)
- MongoDB account
- OpenAI API key

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/diferti/foodfighters.git
   cd foodfighters
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   For the client app (root directory), create a `.env` file based on existing `.env.example.frontend`:
   ```env
   # API Configuration
   API_URL = "http://YOUR_IPv4_ADDRESS:3000/api"  # if you run locally replace YOUR_IPv4_ADDRESS with your actual IPv4 address
   
   # Google Authentication
   GOOGLE_CLIENT_ID = "your_google_client_id"
   GOOGLE_REDIRECT_URI = "https://auth.expo.io/@your-expo-username/foodfighters"
   ```

   For the server (server directory), create a `.env` file based on existing `.env.example.backend`:
   ```env
   # Server Configuration
   PORT = "3000"
   API_URL = "http://YOUR_IPv4_ADDRESS:3000"  # if you run locally replace YOUR_IPv4_ADDRESS with your actual IPv4 address

   # Database Configuration
   MONGODB_URI = "your_mongodb_connection_string"

   # Authentication
   JWT_SECRET = "your_jwt_secret_key_here"

   # Google OAuth
   GOOGLE_CLIENT_ID = "your_google_client_id_here"

   # OpenAI Configuration
   OPENAI_API_KEY = "your_openai_api_key_here"
   ```

   Note: When running locally, you need to use your machine's IPv4 address instead of 'localhost' for the API_URL. You can find your IPv4 address by:
   - Windows: Run `ipconfig` in Command Prompt
   - Mac/Linux: Run `ifconfig` or `ip addr` in Terminal
   
   When hosting the server in production, you can use your actual domain URL instead of the IPv4 address.

4. Set up the server:
   ```bash
   cd server
   npm install
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Start the development server (in a new terminal, from the root directory):
   ```bash
   npx expo start
   ```

7. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Troubleshooting Installation Issues 🔧

If you encounter any issues during installation, try these steps:

1. Update Expo to the latest version:
   ```bash
   npx expo install expo@latest
   ```

2. Fix dependency issues:
   ```bash
   npx expo install --fix
   ```

3. If you're still having problems with npm dependencies, try installing with legacy peer deps:
   ```bash
   npm install --legacy-peer-deps
   ```

4. If the above steps don't work, try clearing npm cache and node_modules:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```