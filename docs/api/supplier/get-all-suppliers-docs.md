## Suppliers

- **GET /api/suppliers**
  - Returns a list of all products.
  - Query server side pagination
  - Requires authentication token.
  - Pagination ex. (**/api/suppliers?page=1&pageSize=10**)
  - **page** represents the current page, **pageSize** is the number of records per page.
  - Get suppliers with products using **/api/suppliers?products=true**
  - Response
    ```json
    {
      "message": "Suppliers got successfully",
      "data": [
        {
          "id": "cltz780sc000010wktjeymb29",
          "name": "Hershey Candy",
          "owedBalance": 1900.5,
          "createdAt": "2024-03-20T02:43:01.500Z",
          "updatedAt": "2024-03-20T02:43:01.500Z",
          "products": []
        },
        {
          "id": "cltz78w0i000110wkp1424sat",
          "name": "Bronx Trading LLC",
          "owedBalance": 1900.5,
          "createdAt": "2024-03-20T02:43:41.951Z",
          "updatedAt": "2024-03-20T02:43:41.951Z",
          "products": []
        },
        {
          "id": "cltz79cil000210wky76j57f8",
          "name": "Manhattan Beverages",
          "owedBalance": 1200.5,
          "createdAt": "2024-03-20T02:44:03.338Z",
          "updatedAt": "2024-03-20T02:44:03.338Z",
          "products": []
        }
      ]
    }
    ```
