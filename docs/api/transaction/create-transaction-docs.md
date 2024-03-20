## Transactions

- **POST /api/transaction**
  - Creates a new transaction.
  - Requires authentication token.
  - Request Body:
    ```json
    {
      "totalAmount": 1200.5,
      "paymentMethod": "CASH",
      "memberId": "cltz5uanj000012tyfi3qbi9c",
      "products": [
        { "id": "cltxr5l9l0000t9afai8uusi6" },
        { "id": "cltxr6czu0001t9afhg4x0ayh" }
      ]
    }
    ```
  - Response
    ```json
    {
      "message": "Transaction created successfully",
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
        "transactionId": null
      }
    }
    ```
