## Transactions

- **POST /api/transactions**
  - Creates a new transaction.
  - Requires authentication token.
  - **Request Body**:
    ```json
    {
      "totalAmount": 1200.5,
      "paymentMethod": "CASH",
      "totalQuantityPurchased": 10,
      "memberId": "clu5uovwo000711bciyby0ic9",
      "purchasedProducts": [
        {
          "productId": "clu5tpx5d000011bc8agy8y3n",
          "purchaseQuantity": 3,
          "price": 10.99,
          "name": "Chicken Seasoning"
        },
        {
          "productId": "clu5trh22000111bc55xsbng6",
          "purchaseQuantity": 3,
          "price": 12.99,
          "name": "Beef Seasoning"
        }
      ]
    }
    ```
  - **Response**
    ```json
    {
      "message": "Transaction completed successfully",
      "data": {
        "id": "clu5vezjl00016f56lergp1a7",
        "totalAmount": 100.5,
        "orderNumber": 2,
        "paymentMethod": "CASH",
        "checkNumber": null,
        "checkAmount": null,
        "totalQuantityPurchased": 10,
        "memberId": "clu5uovwo000711bciyby0ic9",
        "createdAt": "2024-03-24T18:46:54.320Z",
        "updatedAt": "2024-03-24T18:46:54.320Z"
      }
    }
    ```
