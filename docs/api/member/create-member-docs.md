## Members

- **POST /api/member**
  - Creates a new member.
  - Requires authentication token.
  - Request Body:
    ```json
    {
      "name": "1234 Deli Grocery",
      "address": "123 Street Ave",
      "city": "Bronx",
      "state": "New York",
      "zipCode": "123456",
      "owedBalance": 123.49, // Optional
      "phoneNumber": "9188182182"
    }
    ```
  - Response
    ```json
    {
      "message": "Member created successfully",
      "data": {
        "id": "cltz590ph0001ca905sqtr08y",
        "name": "1234 Deli Grocery",
        "address": "123 Street Ave",
        "city": "Bronx",
        "state": "New York",
        "zipCode": "123456",
        "phoneNumber": "9188182182",
        "owedBalance": 123.49
      }
    }
    ```
