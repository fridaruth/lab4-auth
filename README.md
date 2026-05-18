# Laboration 4 - Backend, autentisering

Detta är backend-delen av Laboration 4. Det är ett säkert REST-API för att hantera registrering, inloggning och token-baserad autentisering av användare. 

## Funktioner
* **Användarregistrering (`POST /api/register`):** Skapar en ny användare och hashar lösenordet med `bcrypt` innan det sparas. 
* **Inloggning (`POST /api/login`):** Verifierar användaruppgifter och utfärdar en tidsbegränsad JWT-token.
* **Skyddad rutt (`GET /api/protected`):** En rutt som kräver giltig JWT-token för att ge åtkomst.

## Tekniker
* **Node.js**
* **Express.js**
* **MongoDB**
* **Bcrypt & JSON Web Tokens (JWT)**