## Members

- **GET /api/members/total-owed-balance**

  - Returns aggregate total balance of all existing members.
  - Requires authentication token.
  - **Response**
    ```json
    {
      "message": "Member total owed balance successfully",
      "data": {
        "_sum": {
          "owedBalance": 4217.5
        }
      }
    }
    ```
