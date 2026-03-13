# Garage App

Garage App is a Next.js application that implements a multi-step registration flow for business owners.
It includes:

- A web registration wizard (`/register/*`) that collects address, business details, and credentials.
- API endpoints for registration and address lookup.
- A layered architecture (`application`, `domain`, `infrastructure`, `presentation`) with MongoDB persistence.

## 1. What This Project Does

Main features:

- Business owner registration through `POST /api/auth/register`.
- Address normalization through Google Geocoding via `POST /api/maps`.
- Database health check via `GET /api/health`.

The registration flow stores a user and a business record in MongoDB using Mongoose repositories.

## 2. Install And Run

### Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended
- A running MongoDB instance
- A Google Maps API key with Geocoding enabled

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.local.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Other Scripts

```bash
npm run build   # production build
npm run start   # run production server
npm run lint    # run ESLint
npm test        # run Jest tests
```

## 3. Architecture And Project Structure

This codebase follows a layered, domain-oriented structure:

- `src/application`: DTOs and use cases (business logic orchestration).
- `src/domain`: Entities and repository interfaces (core contracts).
- `src/infrastructure`: Mongoose models/repositories, DB connection, security helpers.
- `src/presentation`: API controllers and web UI (components, hooks, context).
- `app/`: Next.js App Router routes and API route handlers.

Important paths:

- `app/api/auth/register/route.ts`: registration endpoint.
- `app/api/maps/route.ts`: address lookup endpoint.
- `app/api/health/route.ts`: MongoDB connectivity check.
- `src/presentation/api/controllers/RegisterController.ts`: request validation and registration orchestration.
- `src/infrastructure/db/mongoose/connection.ts`: MongoDB connection bootstrap and cache.

## 4. Environment Variables, Dependencies, And Requirements

Create `.env.local` with:

```env
MONGODB_URI=mongodb://localhost:27017/garage_app
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Variable details:

- `MONGODB_URI`: required by `connectMongo()`; requests that require DB access will fail if missing.
- `GOOGLE_MAPS_API_KEY`: required by `GetAddressFromGoogleUseCase`; maps requests fail if missing.

Core runtime dependencies include Next.js, React, Mongoose, Zod, bcrypt, and jsonwebtoken.

## 5. Quick Start For Developers

1. Configure `.env.local` with MongoDB and Google Maps API key.
2. Run `npm install`.
3. Run `npm run dev`.
4. Verify health endpoint:
	 - `GET http://localhost:3000/api/health`
5. Test address lookup:
	 - `POST http://localhost:3000/api/maps`
	 - body: `{ "address": "your address" }`
6. Test registration endpoint:
	 - `POST http://localhost:3000/api/auth/register`
	 - include address + business + user fields expected by `RegisterController`.

## API Reference

### `GET /api/health`

Checks MongoDB connectivity.

Example response:

```json
{
	"ok": true,
	"message": "Mongo connected"
}
```

### `POST /api/maps`

Resolves an input address using Google Geocoding.

Request body:

```json
{
	"address": "1600 Amphitheatre Parkway, Mountain View"
}
```

### `POST /api/auth/register`

Registers a user and a business owner profile.

Request body shape:

```json
{
	"address": {
		"formattedAddress": "...",
		"streetNumber": "...",
		"route": "...",
		"city": "...",
		"province": "...",
		"country": "...",
		"postalCode": "...",
		"lat": 0,
		"lng": 0
	},
	"businessName": "...",
	"ownerName": "...",
	"phone": "...",
	"businessEmail": "...",
	"firstName": "...",
	"lastName": "...",
	"email": "...",
	"password": "..."
}
```

## Notes

- Use `npm run dev` (not `npm dev start`).
- Passwords are hashed before persistence.
- Input is validated with Zod in API controllers.
