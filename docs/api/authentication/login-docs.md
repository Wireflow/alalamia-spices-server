# API Documentation

## Authentication

- **POST /api/auth/login**
  - Logs in a user.
  - Request Body:
    ```json
    {
      "email": "johndoe@mail.com",
      "password": "password123"
    }
    ```
  - Response
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIE1hciAxOSAyMD0IDIxOjIxOjMwIEdNVC0wNDAwIChFYXN0ZXJuIERheWxpZ2h0IFRpbWUpIiwiaWQiOiJjbHR4bjV2bXgwMDAwaWszMGRmc3N0bTF3IiwiaWF0IjoxNzEwODk3NjkwLCJleHAiOjE3MTA5NTM2OTB9.Tjt7vu2cTnIlDepBpj98Oc2A1CTOuRpLFYB3Ux9L85o",
      "auth": true,
      "session": {
        "email": "johndoe@mail.com",
        "id": "cltxn5vmx0000ik30dfsstm1w"
      }
    }
    ```
