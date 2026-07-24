# 🌐 Trippa StayFinder Route Reference

## 🏡 Listing Routes (`/listings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/listings` | Index view - List all stays | No |
| GET | `/listings/new` | Form view to create new stay | Yes |
| POST | `/listings` | Create a new stay | Yes |
| GET | `/listings/:id` | Show view - View stay details & map | No |
| GET | `/listings/:id/edit` | Form view to edit stay | Yes (Owner) |
| PUT | `/listings/:id` | Update stay details | Yes (Owner) |
| DELETE | `/listings/:id` | Delete listing & associated reviews | Yes (Owner) |

## 💬 Review Routes (`/listings/:id/reviews`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/listings/:id/reviews` | Submit rating & review for listing | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete specific review | Yes (Author) |

## 🔐 User Routes (`/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/signup` | Signup form |
| POST | `/signup` | User registration |
| GET | `/login` | Login form |
| POST | `/login` | User authentication |
| GET | `/logout` | Terminate session |
