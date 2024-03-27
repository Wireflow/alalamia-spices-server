## Transactions

- **GET /api/transactions/count**

  - Returns the count of all existing transactions.
  - Requires authentication token.
  - Date range example: `/api/transactions/count?from=2024-03-21&to=2024-03-22`
  - **Query Parameters**:
    - `from`: Start date of the date range.
    - `to`: End date of the date range.
  - **Response**
    ```json
    {
      "message": "Transaction count retrieved successfully",
      "data": 27
    }
    ```
