## Tinder work flow
- Create an Account
- Sign In Using Google
- Phone Number Verification
- Create your profile
- Name, email, Gender, DOB, Interested In, Interests, Upload Photos, Looking For etc.
- Showing User Cards
- Sending the requests -> **API Call**

## Requirement or Features
1. Create an Account.
2. Login.
3. Update your profile.
4. Feed Page - Explore.
5. Send Connection Request.
6. See our matches.
7. See the requests we have sent/received.
8. Update your profile
9. Report the profile.

## Tech Planning
- Two Microservices
  - Front End - ReactJS
  - Back End - NodeJS, MongoDB

- If the planning is perfect writing code is very easy.

## Low Level Design
### 1. API Design 
  - REST API's
    - If we have a Front End and a Back End Application.
    - Front End will send request to /login API at Backend with {emailId, password}.
    - Backend API {/login} API will now check the Database for credentials.
    - /login will send a response to the Front End Back.
    
    - HTTP Methods:-
    - GET APIs - Get the data from the service, fetch the data from the server
    - POST APIs - Send the Data or Push the data, store the data to the server.
    - PUT APIs - Update the data.
    - PATCH - Update the data.
    - DELETE - Delete the data.

  - API's Needed for Project
    - /signup       POST    -> Create a profile
    - /login        POST    -> Create a profile data
    - /profile      GET     -> Get the profile
    - /profile      POST    -> Update the profile
    - /profile      PATCH   -> Update the profile
    - /profile      DELETE  -> Delete the profile
    - /sendReq      POST    -> Ignore the request or Interested in the profile
    - /reviewReq    POST    -> Accept or Reject the request
    - /requests     GET     -> To see all the connection requests which we have got
    - /connections  GET     -> To see all the profiles who are connected to us.
    - Even if the API name is same we will make it different by adding the HTTP Method.

### 2. Database Design
  - Schema Changes in SQL is a very big issue.
  - In MongoDB -> Collections(Tables) and Documents()
  - 1. **User Collection** -> User Table -> [Create an account, Login, Update profile, Feed Page]
    - First Name
    - Last Name
    - Email Id
    - Password
    - Age, Gender
    - It stores only the User Data.

  - 2. **Connection Request** Relation Ship Collection(Table) ->  Send Connection Requests
    - from UserId
    - to UserId
    - status = PENDING, IGNORED.
    - status = ACCEPTED, REJECTED.

## What is the difference between the PUT and PATCH?
🔄 PUT (Complete Update)
- Replaces the entire resource with the new data.
- You must send the full representation of the resource.
- Idempotent: sending the same request multiple times gives the same result.
  - Example:
  - You have a user:
    ```js
    {
    "name": "Harsh",
    "age": 22
    }
    ```
  - A PUT request:
    ```js
    PUT /users/1
    Content-Type: application/json
    {
    "name": "Harsh Ram",
    "age": 23
    }
    ```

🩹 PATCH (Partial Update)
- Modifies only the fields provided in the request.
- You can send just the fields you want to update.
- Also idempotent, but allows partial data.
  ```js
    PATCH /users/1
    Content-Type: application/json

    {
    "age": 23
    }
  ```
✅ Only age is updated. name remains unchanged.

## Design - High Level Design, Low Level Design
