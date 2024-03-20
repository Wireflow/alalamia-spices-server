## Members

- **GET /api/member/:id**

  - Get an existing product.
  - Requires authentication token.
  - Get member with their transactions using **/api/member/:id?transactions=true**
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
