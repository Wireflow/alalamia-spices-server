## Products

- **GET /api/products**
  - Returns a list of all products.
  - Supports server side pagination
  - Requires authentication token.
  - Pagination example: `/api/products?page=1&pageSize=10`
  - Supplier filter example: `/api/products?supplier=true`
  - **Query Parameters**:
    - `page`: Represents the current page number.
    - `pageSize`: Number of records per page.
    - `supplier`: true or false, whether to include the supplier information of the product.
    - `sort`: asc or desc order.
  - **Response**
    ```json
    {
      "message": "Products got successfully",
      "data": [
        {
          "id": "clu0nt49g00018md5jf3wtjtp",
          "name": "Chicken Cube Spices ",
          "description": null,
          "price": 0,
          "boxQuantity": null,
          "quantity": null,
          "grams": null,
          "sku": null,
          "createdAt": "2024-03-21T03:15:05.813Z",
          "updatedAt": "2024-03-22T01:04:12.074Z",
          "supplierId": "cltz78w0i000110wkp1424sat",
          "supplier": {
            "id": "cltz78w0i000110wkp1424sat",
            "name": "Bronx Trading LLC",
            "owedBalance": 1900.5,
            "createdAt": "2024-03-20T02:43:41.951Z",
            "updatedAt": "2024-03-20T02:43:41.951Z"
          }
        },
        {
          "id": "cltxr6czu0001t9afhg4x0ayh",
          "name": "Ajwa Dates",
          "description": "Best Dates In Yemen",
          "price": 10.99,
          "boxQuantity": null,
          "quantity": null,
          "grams": null,
          "sku": null,
          "createdAt": "2024-03-19T02:26:03.961Z",
          "updatedAt": "2024-03-19T02:26:03.961Z",
          "supplierId": null
        },
        {
          "id": "cltz6dc7n0001n6jlj9qyxfml",
          "name": "Hershey Candy",
          "description": "Milk chocolate from bla bla bla",
          "price": 10,
          "boxQuantity": 20,
          "quantity": 36,
          "grams": 2,
          "sku": null,
          "createdAt": "2024-03-20T02:19:09.951Z",
          "updatedAt": "2024-03-20T02:19:09.951Z",
          "supplierId": "cltz5uanj000012tyfi3qbi9c"
        }
      ]
    }
    ```
