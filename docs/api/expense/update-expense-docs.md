## Expenses

- **PUT /api/expenses/:id**

  - Updates an already existing expense.
  - Any field that exists within the expense's table can be updated with this endpoint.
  - Requires authentication token.
  - **Request Body**:

    ```json
    {
      "name": "third text expense",
      "amount": 500
    }
    ```

    OR JUST

    ```json
    {
      "amount": 500
    }
    ```

  - Response

    ```json
    {
      "message": "Expense updated successfully"
    }
    ```
