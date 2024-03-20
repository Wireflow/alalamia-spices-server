## Transactions

- **GET /api/transaction/:id**

  - Get an existing transaction.
  - Requires authentication token.
  - Get transaction with purchased products using **/api/transaction/:id?products=true**
  - Response

    ```json
    {
      "message": "Transaction found successfully",
      "data": {
        "id": "cltz8q0u20001cpnie27r704f",
        "totalAmount": 1200.5,
        "orderNumber": 8,
        "paymentMethod": "CASH",
        "memberId": "cltz5uanj000012tyfi3qbi9c",
        "checkNumber": null,
        "checkAmount": null,
        "createdAt": "2024-03-20T03:25:00.987Z",
        "updatedAt": "2024-03-20T03:25:00.987Z",
        "transactionId": null,
        "products": [
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
          }
        ]
      }
    }
    ```
