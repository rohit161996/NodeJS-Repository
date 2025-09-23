# Dev Tinder UI
- We will be using the Vite to build the project.
- Vite is a famous bundler these days.

## Create the Project:-
- npm create vite@latest
- The name of the project is dev-tinder.
- cd dev-tinder
- npm install

## How to run the project:-
- npm run dev

## Description
- The `main.jsx` is the entry point of the project.

## Steps to build the project:-
- Remove the App.css and remove all the content in the index.css.
- Remove all the content in the App.jsx and write rfce and press <-`

## Configuring TailwindCSS:
- Terminal
```bash
npm install tailwindcss @tailwindcss/vite
```

- vite.config.ts
```js
    import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'
    export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    })
```

- CSS
```js
    @import "tailwindcss";
```

## Component Library
- Daisy UI for the component library.
- Terminal
```bash
    npm i -D daisyui@latest
```

## Components
- Create the Components directory in the src/ directory and Create the components in the folder.
- Create the component and export the file from there.
- Import the file from the jsx where the component has to be used.

## Routing on the Home Page
- https://reactrouter.com/
- npm install react-router-dom
- Now make the router navigation in the App.jsx

```html
    <BrowserRouter basename="/">
        <Routes>
            <Route path="/" element={<div> Base Page </div>}/>
            <Route path="/login" element={<div> Login Page</div>}/>
            <Route path="/test" element={<div> Test Page </div>}/>
        </Routes>
    </BrowserRouter>
```

- Routing is very important in the front end application, because changing the routing becomes very easy when we create the application.
- Body Component
  - Nav Bar
  - Route/ => Feed
  - Route/login => Login
  - Route/connection => Connections
  - Route/profile => Profiles

```html
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
```

- Now we will create children routes, in the Body Component 2 different routes are created in the Body.
- The children routes of Body will render in the `<Outlet/>` Tag of the Body.

## Login Component:
- Now we will create the Login Component.
- The margin on y axis has some issue which needs to be solved using the wrapping of the input component in the div.
- After the creation of the UI we will focus on the functionality.
- Create the state variables (emailId, password) and attach it to the HTML Tags in using the {value & onChange()}


## Fetch vs Axios:
- At the end of the day both the fetch() and axios() are same, they are the wrapper around the XHR request.


## Make Connection to the Backend :
- Now we will call the API using the axios.

## CORS Error :
- We will get Cross Origins Error because we are making an API Call from one Domain to another.
- Frontend microservice is making the API call to the Backend microservice.
- http://localhost:5173/login is making the API call to http://localhost:3000/login
- CORS error is at the browser level.

- localhost == 127.0.0.1
- To handle this error use a middleware from the npm package cors, express also refers us to the same cors.

## CORS Middleware :
- We need to install cors in our backend application.
  - npm install cors

- In the `app.js` in the backend application write the following code:
```js
const cors = require("cors");
app.use(cors());
```

## Cookies :
- axios will not allow the cookies to be sent from the backend.
- The cors option can have the whitelist, i.e. the backend will know where the front end is hosted.
- The cors will have the link of the frontend URL, i.e. we are whitelisting the domain name of the origin: "http://localhost:5173".
- The `credentials: true` will allow the http and https both to send the cookies and receive the data.
- In the `Login.jsx` file write the following code.

```js
  app.use(
      cors({
          origin: "http://localhost:5173",
          credentials: true,
      })
  );
```

- We have to pass a configuration in the axios i.e. `{ withCredentials: true}`, to get the cookie in the browser.
```js
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
    }
    catch (err) {
      console.log(err);
    }
  };
```

## Add Redux Store to the App
- [Redux Installation and Usage Guide](https://redux-toolkit.js.org/introduction/getting-started)

- To install the Redux in our system, we need to install two packages:
  - npm install @reduxjs/toolkit
  - npm install react-redux
- We will now create a redux store `appStore.js` in the utils/ directory.
- In that we will create a user Reducer.
- We will create a userSlice and create the actions and reducers in the slice and we will return those.
- Now we will subscribe to the store in the component and store the data in the appStore by dispatching the action addUser() using the useDispatch() hook.
- Update the Chrome Browser if the Redux Store is not working.

## Add the Photo of the user to the NavBar:
- We will use the useSelector() Hook to subscribe to the store.
- In the NavBar Component we will show the user image, when the store will have the user data the photo from the user data is put in the image, since we will subscribe to the store from the NavBar Component.
- Now after the Login navigate to the feed page, using the useNavigate() Hook.
- Define the feed page in the App.jsx.

## Resolving Issue 1:
- When we are refreshing the page the user icon is gone because the store is getting reset.
- We still have the token with us, it means we are loggedin.
- To resolve this we will get the data from the /profile/view API in the Body Component.
- We will use the useEffect() Hook to call the function to get the data which will be called when the page is loaded.
- The useEffect() hook will be called when the page is rendered.

## NOTE:
- In the StrictMode the API call is made twice in the development mode, but in the Production mode it is only called once.
- In the non strict mode also the api is called only once.

## Error after the login : 
- The response in the backend is handled properly now.
- Error code 401 is send in the response if the token is not valid or authentication error occurs.

## Multiple API Calls:
- There will be no multiple API calls if the navigation is made with the `<Link/>` clicks, but if the navigation is made with `<a></a>` there will be multiple API calls.
- Multiple API calls will be made only when the page is loaded or refreshed.
- If the token is not present user is redirected to login page.

## Logout API:
- It will clear the cookies which are there in the browser.
- It is present in the `<NavBar/>` Component, since the NavBar has the Logout Button. 

## Body Component:
- As soon as the user logsin, the user data is stored in the Redux Store in the handlelogin() function.
- In the Body Component we get the data from the store by subscribing to the store.
- If the user data is not present in the component, we run the useEffect() hook to get the data from the /profile/view API.
- The data is then stored in the Redux Store.

## Profile API:
- In the `<Profile/>` Component, the EditProfile Component is rendered.
- In the `<EditProfile/>` Component, a form is created and the content in the form is controlled with the help of the useState() hook.
- After the content is loaded with the help of the Hook, it is stored in the database with the help of the /profile/edit API.
- The Error Message is also displayed with the help of the toast component from the daisy UI.

## Footer Component:
- In the `<Footer/>` component the links are updated to the Link instead of the anchor tag.

## Login Component:
- In the `<Login/>` component the error is updated with the toast component.

## Logout Functionality:
- In the `<NavBar/>` Component the logout functionality is added on the logout click and the it is done with the help of the /logout API.
- Then the user is removed from the Redux store and the user is navigated to the login page.
- The /profile navigation is also updated to the `<Profile/>` Component.

## Feed Component:
- The `<Feed/>` Component is created and the data in the `<Feed/>` Component is get with the help of the /feed API.
- The feed Slice is created in the Redux Store.
- The feed data is stored in the Redux Store once it is fetched from the /feed API.
- In the UI a `<UserCard/>` is displayed there with the feed[0] data passed as a prop.

## UserCard Component:
- The `<UserCard/>` Component is created in the Components which render the user in the `<Feed/>` Component.

## Connections Page :
- In this Component we will be able to see all the connections which we have connected to.
- In the `App.jsx` we will make a new page like the /profile and /login page.
- We will create a page `/connections`.

## Connection Component
- In the Connection Component the data is fetched with the help of the `/user/connections` API.
- The data is stored in the connectionSlice of the store and then it is displayed on the component.

## Requests Page
- The requests received by the user are displayed on this page, using the `/user/request/received/` API.
- The accept and reject buttons are added along with the request received.
- The `reviewRequest()` is called to accept or reject the request.
- The acceptance or rejection of the request is based on the `/request/review/status` API.
- We can remove the const res from the post API call where the res is not used.

## Accept or Reject the Request received from the User.
- In the UserCard Component we will write the logic to accept or reject the user request.
- 2nd Parameter is the data which we pass in the Post Call so we will pass null in that.
- 3rd Parameter is the `{ withCredentials: true }` 
- On accepting the Connection request we should remove the user from the feed.
- We will remove the accepted or the 
```js
  removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
  }
```

## Sign Up New User:
- Now we will build the Sign Up Feature for new User.
- We will be using the `<Login/>` Component to SignUp or Login.
- The state variable is used as a switch to change the form between the login and the signup using the onClick of the paragraph.
- The handleSignUp function is used to call the SignUp API.
- The backend API `/signup` needs to be changed to login the signed up user since we have not authenticated the user after the user signup.

## Some Bug Fixes are also done.
