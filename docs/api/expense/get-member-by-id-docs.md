## Expenses

- **GET /api/expenses/:id**

  - Get an existing expense.
  - Requires authentication token.
  - **Response**
    ```json
    {
      "message": "Expense found successfully",
      "data": {
        "id": "clu1zzzlf0001pzwmw88pca7y",
        "name": "third text expense",
        "amount": 500,
        "createdAt": "2024-03-22T01:44:07.923Z",
        "updatedAt": "2024-03-22T02:13:52.729Z"
      }
    }
    ```
