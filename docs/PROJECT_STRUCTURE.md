# 📁 Trippa StayFinder Project Structure

This document outlines the architectural organization of the Trippa StayFinder application.

## Directory Overview

- **`controllers/`**: Contains request handling logic for listings, reviews, and user authentication.
- **`models/`**: Mongoose schemas defining data structures for `Listing`, `Review`, and `User`.
- **`routes/`**: Express routers mapping HTTP requests to respective controllers (`listing.js`, `review.js`, `user.js`).
- **`views/`**: EJS template views including layouts (`boilerplate.ejs`), partials (navbar, footer, flash messages), and page views.
- **`utils/`**: Helper utilities including custom error classes (`ExpressError.js`) and async wrappers (`wrapAsync.js`).
- **`public/`**: Static web assets including stylesheets (`css/style.css`, `css/rating.css`) and client-side scripts (`js/script.js`, `js/map.js`).
- **`cloudConfig.js`**: Cloudinary storage engine setup for listing image uploads.
- **`schema.js`**: Joi validation schemas for listings and reviews input sanitization.
