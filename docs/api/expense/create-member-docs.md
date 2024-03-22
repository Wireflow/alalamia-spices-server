## Expenses

- **POST /api/expenses**

  - Creates a new expense.
  - Requires authentication token.
  - **Request Body:**

    ```json
    {
      "name": "third text expense",
      "amount": 500
    }
    ```

  - **Response**
    ```json
    {
      "message": "Expense created successfully",
      "data": {
        "id": "clu217c9a0000uyp0djfc1le0",
        "name": "third text expense",
        "amount": 500,
        "createdAt": "2024-03-22T02:17:50.525Z",
        "updatedAt": "2024-03-22T02:17:50.525Z"
      }
    }
    ```
