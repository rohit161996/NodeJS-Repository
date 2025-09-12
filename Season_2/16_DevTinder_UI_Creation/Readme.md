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

- In the app.js in the backend application write the following code:
```js
const cors = require("cors");
app.use(cors());
```

## Cookies :
- axios will not allow the cookies to be sent from the backend.
- The cors option can have the whitelist, i.e. the backend will know where the front end is hosted.
- The cors will have the link of the frontend URL, i.e. we are whitelisting the domain name of the origin: "http://localhost:5173".
- The `credentials: true` will allow the http and https both to send the cookies and receive the data.
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
