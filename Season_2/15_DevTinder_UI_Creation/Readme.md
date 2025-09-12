# Dev Tinder UI
- We will be using the Vite to build the project.
- Vite is a famous bundler these days.
- 

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
- 


