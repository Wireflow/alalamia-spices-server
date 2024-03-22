## Members

- **GET /api/members/:id**

  - Get an existing member.
  - Requires authentication token.
  - Transaction filter example: `/api/members/:id?transactions=true`
  - **Query Parameters**:
    - `transactions`: true or false, where you want the list of transactions or not.
  - **Response**
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
          "owedBalance": 123.49,
          "transactions": []
        }
      ]
    }
    ```
