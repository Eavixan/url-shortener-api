# URL Shortener API

A RESTful API for shortening long URLs. This API allows users to create, retrieve, update, and delete short URLs. It also tracks how many times each short URL has been accessed.

## Features

- Create a new short URL
- Retrieve the original URL using a short code
- Update an existing short URL
- Delete an existing short URL
- Get access statistics for a short URL
- Validate URL input
- Store data in MongoDB
- Track access count automatically

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- nodemon

## Project Structure

```txt
url-shortener-api/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── urlRoutes.js
│   └── controllers/
│       └── urlController.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/url-shortener-api.git
cd url-shortener-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

The server will run on:

```txt
http://localhost:5000
```

## API Endpoints

### Root Route

```http
GET /
```

Response:

```txt
URL Shortener API is running
```

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "success",
  "message": "Server is healthy"
}
```

## Create Short URL

```http
POST /shorten
```

Request body:

```json
{
  "url": "https://www.example.com/some/long/url"
}
```

Success response:

```json
{
  "_id": "mongodb_id",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "accessCount": 0,
  "createdAt": "2026-06-15T12:00:00.000Z",
  "updatedAt": "2026-06-15T12:00:00.000Z"
}
```

Error response:

```json
{
  "message": "Please provide a valid URL"
}
```

## Retrieve Original URL

```http
GET /shorten/:shortCode
```

Example:

```http
GET /shorten/abc123
```

Success response:

```json
{
  "_id": "mongodb_id",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "accessCount": 1,
  "createdAt": "2026-06-15T12:00:00.000Z",
  "updatedAt": "2026-06-15T12:00:00.000Z"
}
```

This endpoint increases the `accessCount` by `1` every time it is called.

Not found response:

```json
{
  "message": "Short URL not found"
}
```

## Update Short URL

```http
PUT /shorten/:shortCode
```

Example:

```http
PUT /shorten/abc123
```

Request body:

```json
{
  "url": "https://www.google.com"
}
```

Success response:

```json
{
  "_id": "mongodb_id",
  "url": "https://www.google.com",
  "shortCode": "abc123",
  "accessCount": 1,
  "createdAt": "2026-06-15T12:00:00.000Z",
  "updatedAt": "2026-06-15T12:30:00.000Z"
}
```

This endpoint updates the original URL but keeps the same `shortCode`.

## Delete Short URL

```http
DELETE /shorten/:shortCode
```

Example:

```http
DELETE /shorten/abc123
```

Success response:

```http
204 No Content
```

Not found response:

```json
{
  "message": "Short URL not found"
}
```

## Get URL Statistics

```http
GET /shorten/:shortCode/stats
```

Example:

```http
GET /shorten/abc123/stats
```

Success response:

```json
{
  "_id": "mongodb_id",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "accessCount": 5,
  "createdAt": "2026-06-15T12:00:00.000Z",
  "updatedAt": "2026-06-15T12:00:00.000Z"
}
```

This endpoint only shows statistics. It does not increase `accessCount`.

## Error Responses

Missing URL:

```json
{
  "message": "URL is required"
}
```

Invalid URL:

```json
{
  "message": "Please provide a valid URL"
}
```

Short URL not found:

```json
{
  "message": "Short URL not found"
}
```

Server error:

```json
{
  "message": "Server error",
  "error": "Error message here"
}
```

## How It Works

The user sends a long URL to the API. The server validates the URL, generates a random unique short code, and stores the data in MongoDB.

When the short code is requested, the API searches the database and returns the original URL data. Each time the short URL is retrieved, the access count increases.

Basic request flow:

```txt
Client / Postman
      ↓
Express Route
      ↓
Controller Function
      ↓
Mongoose Model
      ↓
MongoDB Database
      ↓
JSON Response
```

## Database Model

Each URL document contains:

```txt
url          Original long URL
shortCode    Random unique short code
accessCount  Number of times the short URL was accessed
createdAt    Date when the short URL was created
updatedAt    Date when the short URL was last updated
```

## Scripts

Run the development server:

```bash
npm run dev
```

Run the production server:

```bash
npm start
```

## GitHub Push Commands

After making changes, use:

```bash
git add .
git commit -m "Your commit message"
git push
```

## Future Improvements

- Add a simple frontend
- Add real redirect route like `GET /:shortCode`
- Allow users to create custom short codes
- Add URL expiration date
- Add rate limiting
- Add authentication
- Add better validation middleware
- Add unit tests
- Deploy API online

## Author

Created as a backend learning project using Node.js, Express.js, MongoDB, and Mongoose.
