## Transactions

- **GET /api/transactions**

  - Returns a list of all transactions.
  - Query server side pagination
  - Requires authentication token.
  - Pagination example: `/api/products?page=1&pageSize=10`
  - Products filter example: `/api/transactions?products=true`
  - **Query Parameters**:
    - `page`: Represents the current page number.
    - `pageSize`: Number of records per page.
    - `products`: true or false, whether to include the products purchased in the transactions.
  - **Response**
    ```json
    {
      "message": "Transactions got successfully",
      "data": [
        {
          "id": "cltwdbx8e0000p8r7wysorz7x",
          "totalAmount": 10,
          "orderNumber": 1,
          "paymentMethod": "CHECK",
          "memberId": null,
          "createdAt": "2024-03-18T03:10:42.687Z",
          "updatedAt": "2024-03-18T03:10:42.687Z",
          "transactionId": null,
          "products": []
        },
        {
          "id": "cltwdcsgm00001xzhtpvh857h",
          "totalAmount": 10,
          "orderNumber": 2,
          "paymentMethod": "CHECK",
          "memberId": null,
          "createdAt": "2024-03-18T03:11:23.159Z",
          "updatedAt": "2024-03-18T03:11:23.159Z",
          "transactionId": null
        },
        {
          "id": "cltwde17n0000100a5urs9p0y",
          "totalAmount": 10.22,
          "orderNumber": 3,
          "paymentMethod": "CHECK",
          "memberId": null,
          "createdAt": "2024-03-18T03:12:21.155Z",
          "updatedAt": "2024-03-18T03:12:21.155Z",
          "transactionId": null,
          "products": []
        }
      ]
    }
    ```
