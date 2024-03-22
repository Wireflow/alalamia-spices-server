## Members

- **PUT /api/members/:id**

  - Updates an already existing member.
  - Any field that exists within the member's table can be updated with this endpoint.
  - Requires authentication token.
  - **Request Body**:

    ```json
    {
      "name": "1234 Deli Grocery",
      "address": "123 Street Ave",
      "city": "Bronx",
      "state": "New York",
      "zipCode": "123456",
      "owedBalance": 123.49,
      "phoneNumber": "9188182182"
    }
    ```

    OR JUST

    ```json
    {
      "owedBalance": 123.49
    }
    ```

  - Response

    ```json
    {
      "message": "Member updated successfully"
    }
    ```
