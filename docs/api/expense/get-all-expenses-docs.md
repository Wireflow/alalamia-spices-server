## Expenses

- **GET /api/expenses**
  - Returns a list of all expenses.
  - Supports server-side pagination.
  - Allows filtering expenses based on a specific date range.
  - Requires authentication token.
  - Pagination example: `/api/expenses?page=1&pageSize=10`
  - Date range example: `/api/expenses?from=2024-03-21&to=2024-03-22`
  - **Query Parameters**:
    - `page`: Represents the current page number.
    - `pageSize`: Number of records per page.
    - `from`: Start date of the date range.
    - `to`: End date of the date range.
  - **Response**
    ```json
    {
      "message": "Expenses got successfully",
      "data": [
        {
          "id": "clu1zzzlf0001pzwmw88pca7y",
          "name": "second text expense",
          "amount": 100,
          "createdAt": "2024-03-22T01:44:07.923Z",
          "updatedAt": "2024-03-22T01:44:07.923Z"
        },
        {
          "id": "clu2005jt0002pzwm12sub7g3",
          "name": "third text expense",
          "amount": 200,
          "createdAt": "2024-03-22T01:44:15.641Z",
          "updatedAt": "2024-03-22T01:44:15.641Z"
        }
      ]
    }
    ```
