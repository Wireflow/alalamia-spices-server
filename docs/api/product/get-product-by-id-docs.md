## Products

- **GET /api/products/:id**

  - Get an existing product.
  - Requires authentication token.
  - Supplier filter example: `/api/products/cltz6hcaa0001zhfccsruyns5?supplier=true`
  - **Query Parameters**:
    - `supplier`: true or false, whether to include the supplier information of the product.
  - **Response**
    ```json
    {
      "message": "Product found successfully",
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
