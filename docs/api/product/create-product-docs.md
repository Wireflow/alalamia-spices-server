## Products

- **POST /api/products**
  - Creates a new product.
  - Requires authentication token.
  - **Request Body**:
    ```json
    {
      "name": "Hershey Candy",
      "description": "Milk chocolate from bla bla bla", // Optional
      "price": 10,
      "boxQuantity": 20, // Optional
      "quantity": 36, // Optional
      "grams": 2, // Optional
      "sku": "T-SHOPLOGO-BLA-1", // Optional
      "supplierId": "cltz5uanj000012tyfi3qbi9c" // Optional
    }
    ```
  - **Response**
    ```json
    {
      "message": "Product created successfully",
      "data": {
        "id": "cltz6hcaa0001zhfccsruyns5",
        "name": "Hershey Candy",
        "description": "Milk chocolate from bla bla bla",
        "price": 10,
        "boxQuantity": 20,
        "quantity": 36,
        "grams": 2,
        "sku": "T-SHOPLOGO-BLA-1",
        "createdAt": "2024-03-20T02:22:16.691Z",
        "updatedAt": "2024-03-20T02:22:16.691Z",
        "supplierId": "cltz5uanj000012tyfi3qbi9c"
      }
    }
    ```
