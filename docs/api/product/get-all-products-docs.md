## Products

- **GET /api/products**
  - Returns a list of all products.
  - Query server side pagination
  - Requires authentication token.
  - Pagination ex. (**/api/products?page=1&pageSize=10**)
  - **page** represents the current page, **pageSize** is the number of records per page.
  - Response
    ```json
    {
      "message": "Products got successfully",
      "data": [
        {
          "id": "cltxr5l9l0000t9afai8uusi6",
          "name": "Ajwa Dats",
          "description": "Best Dates In Yemen",
          "price": 10.99,
          "boxQuantity": null,
          "quantity": 10,
          "grams": null,
          "sku": null,
          "createdAt": "2024-03-19T02:25:28.024Z",
          "updatedAt": "2024-03-19T02:41:41.610Z",
          "supplierId": null
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
