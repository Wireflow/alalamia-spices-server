## Members

- **POST /api/members/get-by-phone**
  - Returns a list of members that contains the phone number.
  - Requires authentication token.
  - **Request Body**:
    ```json
    {
      "phoneNumber": "9177131203"
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
