# Astrologer-Distribution

Flow Distribution System API Documentation
Introduction
The Flow Distribution System API provides endpoints for managing the distribution of users among astrologers. It implements a fair distribution algorithm to evenly distribute users based on astrologer availability and load. The API is built using Express.js for the RESTful endpoints.

Base URL
The base URL for accessing the API is: http://localhost:3000

Authentication
The API requires user authentication using JSON Web Tokens (JWT). Users must include a valid JWT token in the request headers for authentication.

Endpoints
1. Assign User to Astrologer
URL: /assignUser
Method: POST
Description: Assigns a user to an available astrologer.
Request Body:
{
  "userId": "string" // User ID
}
Response:
{
  "message": "string" // Success message
}
Error Responses:
400 Bad Request: If the request body is missing or invalid.
500 Internal Server Error: If an unexpected error occurs.
2. Get Next User for Astrologer
URL: /nextUser/:astrologerId
Method: GET
Description: Retrieves the next user for the specified astrologer.
Parameters:
astrologerId: Astrologer ID
Response:
{
  "userId": "string" // User ID
}
Error Responses:
404 Not Found: If no user is available for the astrologer.
500 Internal Server Error: If an unexpected error occurs.
Example Usage
Assign User to Astrologer
http

POST /assignUser
Content-Type: application/json
Authorization: Bearer <JWT_Token>

{
  "userId": "123456"
}
Response:
{
  "message": "User assigned to astrologer successfully"
}
Get Next User for Astrologer
http

GET /nextUser/1
Authorization: Bearer <JWT_Token>
Response:
{
  "userId": "789012"
}
Error Handling
The API returns appropriate HTTP status codes and error messages for invalid requests and server errors.
Detailed error messages are provided in the response body for debugging purposes.
