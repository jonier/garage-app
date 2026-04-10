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
- Appointment management through `GET` and `POST /api/appointments`.

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
- `app/api/appointments/route.ts`: appointments endpoint.
- `src/presentation/api/controllers/RegisterController.ts`: request validation and registration orchestration.
- `src/infrastructure/db/mongoose/connection.ts`: MongoDB connection bootstrap and cache.

## 4. Environment Variables

Create `.env.local` with:

```env
MONGODB_URI=mongodb://localhost:27017/garage_app
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
JWT_SECRET=your_jwt_secret
```

Variable details:

- `MONGODB_URI`: required by `connectMongo()`; requests that require DB access will fail if missing.
- `GOOGLE_MAPS_API_KEY`: required by `GetAddressFromGoogleUseCase`; maps requests fail if missing.
- `JWT_SECRET`: required for signing and verifying JWT tokens.

> Never commit secrets to the repository.

## 5. Quick Start For Developers

1. Configure `.env.local` with MongoDB, Google Maps API key, and JWT secret.
2. Run `npm install`.
3. Run `npm run dev`.
4. Verify health endpoint:
   - `GET http://localhost:3000/api/health`
5. Test address lookup:
   - `POST http://localhost:3000/api/maps`
   - body: `{ "address": "your address" }`
6. Test registration endpoint:
   - `POST http://localhost:3000/api/auth/register`
7. Test appointments:
   - `GET http://localhost:3000/api/appointments`
   - `POST http://localhost:3000/api/appointments`
   - Requires `Authorization: Bearer <token>` header.

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

---

## Appointments API

All appointment endpoints require a valid **Bearer token** in the `Authorization` header.
The token is resolved to a business via the authenticated user's `ownerId`.

---

### `GET /api/appointments`

Returns all appointments for the authenticated business.
Optionally filter by date.

**Headers:**

```
Authorization: Bearer <token>
```

**Query params (optional):**

| Param | Type | Format | Description |
|-------|------|--------|-------------|
| `date` | string | `YYYY-MM-DD` | Filter appointments by date |

**Response `200`:**

```json
[
  {
    "id": "664f1a2b3c4d5e6f7a8b9c0d",
    "date": "2026-04-15",
    "time": "10:30",
    "customer": "John Doe",
    "service": "Oil Change",
    "notes": "Synthetic oil preferred"
  }
]
```

**Error responses:**

| Status | Description |
|--------|-------------|
| `400` | Invalid date format |
| `401` | Missing or invalid token |
| `404` | Business not found for current user |
| `500` | Server error |

**Example:**

```bash
# All appointments
curl -X GET http://localhost:3000/api/appointments \
  -H "Authorization: Bearer <token>"

# Filter by date
curl -X GET "http://localhost:3000/api/appointments?date=2026-04-15" \
  -H "Authorization: Bearer <token>"
```

---

### `POST /api/appointments`

Creates a new appointment for the authenticated business.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request body:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `date` | string | ✅ | Format `YYYY-MM-DD` |
| `time` | string | ✅ | Format `HH:mm` (24h) |
| `customer` | string | ✅ | 2–120 characters |
| `service` | string | ✅ | 2–120 characters |
| `notes` | string | ❌ | Max 500 characters |

**Response `201`:**

```json
{
  "id": "664f1a2b3c4d5e6f7a8b9c0d",
  "date": "2026-04-15",
  "time": "10:30",
  "customer": "John Doe",
  "service": "Oil Change",
  "notes": "Synthetic oil preferred"
}
```

**Error responses:**

| Status | Description |
|--------|-------------|
| `400` | Invalid input (Zod validation error) |
| `401` | Missing or invalid token |
| `404` | Business not found for current user |
| `500` | Server error |

**Example:**

```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-04-15",
    "time": "10:30",
    "customer": "John Doe",
    "service": "Oil Change",
    "notes": "Synthetic oil preferred"
  }'
```

---

## Notes

- Use `npm run dev` (not `npm dev start`).
- Passwords are hashed before persistence.
- Input is validated with Zod in API controllers.
- All appointment endpoints require JWT authentication.
- Never expose `JWT_SECRET` in the repository.