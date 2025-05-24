# 🦫 FoodFighters

An **AI-powered gamified nutrition app** that transforms nutrition from a chore into a game – making healthy eating **accessible**, **engaging**, and **community-driven**. FoodFighters combines the power of **artificial intelligence** with **gamification** to help users make better food choices while having fun.

---

## 🌟 Features

### 🧠 Core Features
- **AI-Powered Meal Analysis**
  - 📷 Instant photo analysis of meals  
  - 🧮 Detailed nutrition breakdown (calories, proteins, carbs, fat, fiber)  
  - 🥫 Product identification with weight measurements  
  - 🥗 Personalized diet plan generation  

### 🎮 Gamification Elements
- **💎 Dual Currency System**
  - Gems: Used for ranking and competition  
  - Coins: Spendable currency for in-app purchases  

- **🏆 Competitive Features**
  - Leaderboards  
  - League tiers  
  - Ranking system  

- **🎁 Reward System**
  - Pet fighters (collectible and upgradeable)  
  - Real-world rewards:  
    - 🛒 Grocery store discounts  
    - 🍔 Food delivery coupons  

- **📋 Diet Plan Integration**
  - 🍽️ Personalized diet plans based on:  
    - User preferences  
    - Health goals  
    - Dietary restrictions  
  - ⚡ Double points for following diet plan  

---

## 🛠️ Technologies Used

### 📱 Frontend
- **React Native**: Core framework for mobile app development  
- **Expo**: Development platform and build tools  
- **TypeScript**: Type-safe programming language  
- **NativeWind**: Tailwind CSS for React Native  
- **Expo Router**: File-based routing for React Native  
- **React Navigation**: Navigation library  

### 🧠 Backend & AI
- **Node.js & Express**: Core server framework  
- **MongoDB & Mongoose**: Database for user data and meal history  
- **OpenAI API**: AI-powered meal analysis and diet plan generation  
- **JWT Authentication**: Secure user authentication  
- **Swagger/OpenAPI**: API documentation  
- **Multer**: File upload handling for meal images  

### 🧩 Additional Features
- **Expo Camera**: Camera functionality for meal photos  
- **Expo Image Picker**: Image selection from gallery  
- **Expo Font**: Custom font loading  
- **React Native Reanimated**: Advanced animations  
- **React Native Gesture Handler**: Gesture handling  

---

## 📋 Prerequisites

- Node.js (v14 or higher)  
- npm or yarn  
- Expo CLI  
- iOS Simulator (for Mac) or Android Studio (for Android development)  
- MongoDB account  
- OpenAI API key  

---

## 🚀 Installation

### 1️⃣ Clone and Setup
```bash
# Clone the repository
git clone https://github.com/Diferti/food-fighters
cd food-fighters

# Install dependencies
npm install
# or
yarn install
```

### 2️⃣ Environment Configuration

#### Frontend Setup
Create a `.env` file in the root directory based on `.env.example.frontend`:
```env
# API Configuration
# if you run locally replace YOUR_IPv4_ADDRESS with your actual IPv4 address
API_URL = "http://YOUR_IPv4_ADDRESS:3000/api"  

# Google Authentication
GOOGLE_CLIENT_ID = "your_google_client_id"
GOOGLE_REDIRECT_URI = "https://auth.expo.io/@your-expo-username/foodfighters"
```

#### Backend Setup
Create a `.env` file in the server directory based on `.env.example.backend`:
```env
# Server Configuration
PORT = "3000"
# if you run locally replace YOUR_IPv4_ADDRESS with your actual IPv4 address
API_URL = "http://YOUR_IPv4_ADDRESS:3000"  

# Database Configuration
MONGODB_URI = "your_mongodb_connection_string"

# Authentication
JWT_SECRET = "your_jwt_secret_key_here"

# Google OAuth
GOOGLE_CLIENT_ID = "your_google_client_id_here"

# OpenAI Configuration
OPENAI_API_KEY = "your_openai_api_key_here"
```

> 💡 **Important Notes:**
> - For local development, use your machine's IPv4 address instead of 'localhost'
> - For production, use your actual domain URL
> 
> 🔍 **How to find your IPv4 address:**
> - Windows: Run `ipconfig` in Command Prompt
> - Mac/Linux: Run `ifconfig` or `ip addr` in Terminal

### 3️⃣ Server Setup
```bash
# Navigate to server directory
cd server

# Install server dependencies
npm install

# Start the server
npm start
```

### 4️⃣ Start Development
```bash
# In a new terminal, from the root directory
npx expo start --clear
```

### 5️⃣ Run the App
Choose your preferred platform:
- iOS: Press `i` for iOS simulator
- Android: Press `a` for Android emulator
- Physical Device: Scan `QR code` with Expo Go app

## 🔧 Troubleshooting

If you encounter any issues during installation, try these solutions in order:

### 1. Update Expo
```bash
npx expo install expo@latest
```

### 2. Fix Dependencies
```bash
npx expo install --fix
```

### 3. Legacy Peer Dependencies
```bash
npm install --legacy-peer-deps
```

### 4. Clean Installation
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Fresh install
npm install
```