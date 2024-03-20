## Suppliers

- **POST /api/supplier**
  - Creates a new supplier.
  - Requires authentication token.
  - Request Body:
    ```json
    {
      "name": "Hershey Candy",
      "owedBalance": 1900.5
    }
    ```
  - Response
    ```json
    {
      "message": "Supplier created successfully",
      "data": {
        "id": "cltz780sc000010wktjeymb29",
        "name": "Hershey Candy",
        "owedBalance": 1900.5,
        "createdAt": "2024-03-20T02:43:01.500Z",
        "updatedAt": "2024-03-20T02:43:01.500Z"
      }
    }
    ```
