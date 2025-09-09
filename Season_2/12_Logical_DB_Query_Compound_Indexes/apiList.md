## List of API's
- authRouter
  - POST /signup
  - POST /login
  - POST /logout

- profileRouter
  - GET /profile/view
  - PATCH /profile/edit
  - PATCH /profile/password

- connectionRequestRouter
  - POST /request/send/:status/:userId
    - POST /request/send/ignored/:userId
    - POST /request/send/interested/:userId

  - POST /request/review/accepted/:requestId
  - POST /request/review/rejected/:requestId

- userConnectionsRouters
  - GET /user/connections
  - GET /user/requests/received
  - GET /user/feed
