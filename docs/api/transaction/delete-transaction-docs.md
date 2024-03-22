## Transactions

- **PUT /api/transactions/:id**

  - Permanently deletes a transaction from the database.
  - Requires authentication token.
  - **Response**
    ```json
    {
      "message": "Transaction deleted successfully"
    }
    ```
