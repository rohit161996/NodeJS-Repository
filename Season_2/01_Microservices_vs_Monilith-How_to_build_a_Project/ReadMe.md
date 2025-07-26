# How Projects are build in the Organization?

## Project Lifecycle:-
- Waterfall Model (Software Development Life Cycle)
  1. Requirements   -> Product/Project Manager Decide the requirements of the project along with the Designers.
  2. Design         -> Design Documentation of the Project is created -> By Senior Engineer/Engineering Manager.
  3. Development    -> SDE 1, SDE 2 are involved -> Writing Unit and Integration Tests is responsibility of the Developers
  4. Testing        -> SDE Testing -> SDET Test the application
  5. Deployment     -> DevOps Engineer Take Care of the Deployment, Servers etc.
  6. Maintainance   -> All the Steps from 1 to 5 is done again.

- All the things in the startup is done by 3-4 people.

## Monolith vs Microservice Architecture:-

### Monolith
- One Project has all the Code or all the services
  - Backend
  - Database Services
  - FrontEnd Services
  - Authentication Services
  - Email Services
  - Analytic Services

#### 1. Dev Speed
- Slow to develop

#### 2. Code Repo
- Single Code Repo

#### 3. Scalability
- It is tough to scale a Monolith Architecture

#### 4. Deployment
- Whole Project is deployed for a small change also.

#### 5. Tech Stack
- Restricted with the Tech Stack.
- Like if the backend is built in the Java, we cannot use other Technology.

#### 6. Infra Cost
- It depends on the Traffic, DevOps but Monolith has less infra cost.

#### 7. Complexity
- High complexity for large project in microservices.

#### 8. Fault Isolation
- Whole project is affected by a small change.
- Fault isolation is not there

#### 9. Testing
- Easier to write end to end test cases.

#### 10. Ownership
- There is a central ownership.

#### 11. Maintainence
- It is tough to maintain.

#### 12. Rewamps
- It is tough to change the whole front end or backend if we want.

#### 13. Debugging
- It is comparatively easy in Monolith Architecture.

#### 14. Dev Experience
- It is not so good.

--------------------------------------------------------------------------------------------------------
### Microservices 
- There are multiple small services
- Service or Project or Application are used alternatively.
- Service is altogether a new Project
- There can be a microservice only for
  - Front End
  - Backend Service
  - Authentication Service
  - Notification Service
  - Analytics Service
e.g. In the Ride Booking App :-
 - Calculating Fare for the ride is a service which is done by a team.
 - Fraud Detection is a service which is done by a team.
 - Notification is a service which is done by a team.

e.g. Admin Desktop is build in React and the UI is Build in the NextJS

- Most of the Companies are following the Microservices Architecture.

#### 1. Dev Speed
- Fast to Develop

#### 2. Code Repo
- Multiple Code Repo can be used for multiple teams

#### 3. Scalability
- It is comparatively easy to scale a Monolith Architecture

#### 4. Deployment
- A service can be deployed alone without requiring the other services.
- It can have many problems such as version issues.
- But it can be made backward version compatible. 

#### 5. Tech Stack
- Microservices architecture can use any number of tech stack for Front End or Backend etc.

#### 6. Infra Cost
- It is higher in Microservices as each service requires seperate server, seperate team etc.

#### 7. Complexity
- High complexity for small project in microservices.

#### 8. Fault Isolation
- Whole project is affected by a small change.
- Fault isolation is there.

#### 9. Testing
- Complex to write the end to end test cases.

#### 10. Ownership
- There is distributed ownership.

#### 11. Maintainence
- It is easy to maintain.

#### 12. Rewamps
- It is easy to change the whole front end or backend if we want.

#### 13. Debugging
- It can be tough in Microservices

#### 14. Dev Experience
- It is much better.
---------------------------------------------------------------------------------------------------

## What happens in NamasteDev.com?
- Admin Dashboard is a Microservice is build in ReactJS and the UI is Build in the NextJS.
- Student web is a microservice of frontend written in NextJS, which is used to watch the video.
- Backend is written in the NodeJS, it has service to send emails.
- MobileApp Application which will be built using the React Native.

## What are we going to build in DevTinder?
- Front End Microservices -> ReactJS.
- Back End Microservices -> NodeJS.
- These two communicate through the APIs:-
  - If we load a profile page through URL -> devtinder.com/profile
  - It will make an API call to /getProfile
  - It will get the data from the Backend
  - The data will be send to the UI.

