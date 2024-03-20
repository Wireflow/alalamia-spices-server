## Members

- **POST /api/member/get-by-address**
  - Returns a list of members that contains the address.
  - Requires authentication token.
  - Request Body:
    ```json
    {
      "address": "123 Street Ave"
    }
    ```
  - Response
    ```json
    {
      "message": "Member found successfully",
      "data": [
        {
          "id": "cltz5uanj000012tyfi3qbi9c",
          "name": "1234 Deli Grocery",
          "address": "123 Street Ave",
          "city": "Bronx",
          "state": "New York",
          "zipCode": "123456",
          "phoneNumber": "9188182182",
          "owedBalance": 123.49
        }
      ]
    }
    ```
