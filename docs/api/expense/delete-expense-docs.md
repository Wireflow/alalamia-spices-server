## Expense

- **PUT /api/expenses/:id**

  - Permanently deletes an expense from the database.
  - Requires authentication token.
  - **Response**

    ```json
    {
      "message": "Expense deleted successfully"
    }
    ```
