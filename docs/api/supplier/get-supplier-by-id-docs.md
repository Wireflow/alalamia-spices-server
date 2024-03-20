## Suppliers

- **GET /api/supplier/:id**

  - Get an existing supplier.
  - Requires authentication token.
  - Get suppliers with products using **/api/supplier/:id?products=true**
  - Response

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
