## Members

- **GET /api/members**
  - Returns a list of all members.
  - Query server side pagination
  - Requires authentication token.
  - Pagination ex. (**/api/members?page=1&pageSize=10**)
  - **page** represents the current page, **pageSize** is the number of records per page.
  - Response
    ```json
    {
      "message": "Members got successfully",
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
        },
        {
          "id": "cltz5uanj000012tyfi3qbi9c",
          "name": "1234 Deli Grocery",
          "address": "123 Street Ave",
          "city": "Bronx",
          "state": "New York",
          "zipCode": "123456",
          "phoneNumber": "9188182182",
          "owedBalance": 123.49
        },
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
