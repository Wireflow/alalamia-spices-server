## Products

- **PUT /api/products/:id**

  - Updates an already existing product.
  - Any field that exists within the product's table can be updated with this endpoint.
  - Requires authentication token.
  - **Request Body**:

    ```json
    {
      "name": "Hershey Candy",
      "description": "Milk chocolate from bla bla bla",
      "price": 10,
      "boxQuantity": 20,
      "quantity": 36,
      "grams": 2,
      "sku": "T-SHOPLOGO-BLA-1",
      "supplierId": "cltz5uanj000012tyfi3qbi9c"
    }
    ```

    OR JUST

    ```json
    {
      "boxQuantity": 20
    }
    ```

  - **Response**

    ```json
    {
      "message": "Product updated successfully"
    }
    ```
