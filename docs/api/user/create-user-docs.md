## Members

- **POST /api/users**
  - Creates a new member.
  - Requires authentication token.
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
      "message": "User created successfully",
      "data": {
        "id": "cltz9a09u0000jiyl9gonkmfo",
        "email": "johndoe@mail.com",
        "password": "$2b$10$M1AkRyDhoT1CUaxw.C3r3eG4YaeB95yosDgS7pH9XS1yk7NSSz.IW",
        "createdAt": "2024-03-20T03:40:33.378Z"
      }
    }
    ```
