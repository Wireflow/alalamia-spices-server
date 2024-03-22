## Suppliers

- **GET /api/suppliers/:id**

  - Get an existing supplier.
  - Requires authentication token.
  - Products filter example: `/api/suppliers?products=true`
  - **Query Parameters**:
    - `products`: true or false, whether to include the products of the supplier.
  - **Response**
    ```json
    {
      "message": "Supplier found successfully",
      "data": {
        "id": "cltz79cil000210wky76j57f8",
        "name": "Manhattan Beverages",
        "owedBalance": 1200.5,
        "createdAt": "2024-03-20T02:44:03.338Z",
        "updatedAt": "2024-03-20T02:44:03.338Z",
        "products": []
      }
    }
    ```
