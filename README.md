# 🏡 Trippa - StayFinder Major Project

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://trippa-stayfinder.vercel.app)

**Trippa StayFinder** is a full-stack web application designed for discovering, booking, and hosting unique stays and holiday rentals across the globe (inspired by Airbnb).

👉 **Live Demo Application**: [https://trippa-stayfinder.vercel.app](https://trippa-stayfinder.vercel.app)

---

## ✨ Features

- 🌟 **Explore Listings**: Browse a curated list of vacation stays with filtering by category (Trending, Rooms, Iconic Cities, Mountains, Castles, Camping, Farms, Amazing Pools, Arctic, Domes, Boats).
- 🔐 **User Authentication**: Secure user registration, login, and logout powered by `passport` & `passport-local`.
- ➕ **Host a Stay**: Authenticated users can list their own homes and stays with title, description, location, country, and price.
- 🖼️ **Image Uploads**: Integrated image hosting using **Cloudinary** and `multer-storage-cloudinary`.
- 📍 **Interactive Maps & Geocoding**: Address geocoding and interactive map integration powered by **Mapbox SDK**.
- 💬 **Reviews & Ratings**: Users can leave reviews and ratings for listings.
- 📱 **Responsive Design**: Modern, Mobile-friendly UI built with EJS templates and custom CSS.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (`ejs-mate`), Vanilla CSS, HTML5
- **Database**: MongoDB, Mongoose ODM
- **Authentication**: `passport`, `passport-local`, `passport-local-mongoose`
- **Session Management**: `express-session`, `connect-mongo`, `connect-flash`
- **Media & Maps**: Cloudinary API, Mapbox SDK
- **Deployment**: Vercel Serverless Functions

---

## 🚀 Local Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnkitaPriyadarshini-repos/trippa-stayFinder-major-project.git
   cd trippa-stayFinder-major-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Run the server**:
   ```bash
   npm start
   ```
   Open `http://localhost:8080` in your browser.
