## Suppliers

- **PUT /api/suppliers/:id**

  - Updates an already existing supplier.
  - Any field that exists within the supplier's table can be updated with this endpoint.
  - Requires authentication token.
  - **Request Body**:

    ```json
    {
      "name": "Manhattan Beverages",
      "owedBalance": 1200.5
    }
    ```

    OR JUST

    ```json
    {
      "owedBalance": 1200.5
    }
    ```

  - Response

    ```json
    {
      "message": "Supplier updated successfully"
    }
    ```
