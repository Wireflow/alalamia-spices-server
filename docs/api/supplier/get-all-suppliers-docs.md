## Suppliers

- **GET /api/suppliers**
  - Returns a list of all products.
  - Supports server side pagination
  - Requires authentication token.
  - Pagination example: `/api/suppliers?page=1&pageSize=10`
  - Products filter example: `/api/suppliers?products=true`
  - **Query Parameters**:
    - `page`: Represents the current page number.
    - `pageSize`: Number of records per page.
    - `products`: true or false, whether to include the products of the supplier.
    - `sort`: asc or desc order.
  - **Response**
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
