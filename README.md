# Notes

![Visitor Count](https://profile-counter.glitch.me/sfwnisme/count.svg)

- I will work on the UI and UI components from scratch using tailwindcss
- I will work on the SEO and SGC "static generated components" on the end of the project to save more time meanwhile.

## Add-ons tasks

- [x] Admins theme *currentlly working on it*
  - [ ] full access epic
- [ ] HR epic
  - [ ] Humen Resource epic: access the insturctors and lower position
- [ ] Instructor theme
  - [ ] Dashboard Epic
- [ ] Public theme.
  - [ ] overview epic

## styling rules

- fonts
  - main color gray-800
  - second color gray-700
  - hover color gray-900
  - success text color green-600
  - error text color red-600
  - warnint text color yellow-600
- backgrounds
  - main color gray-900
  - second color gray-800
  - light mani color gray-600
  - light second color gray-500
  - light hover color gray-700
- buttons
  - success:
    - main color gray-800
    - second color gray-700
    - hover color gray-900
    - disabled color gray-500
  - danger:
    - main color red-800
    - second color red-700
    - hover color red-900
    - disabled color red-500
  - warning:
    - main color yellow-800
    - second color yellow-700
    - hover color yellow-900
    - disabled color yellow-500
  - info:
    - main color blue-800
    - second color blue-700
    - hover color blue-900
    - disabled color blue-500
- inputs
  - static
    - main color gray-800
    - second color gray-700
    - focus-visible color gray-800
    - focus-visible outline color gray-200
  - success
    - main color green-800
    - second color green-700
    - focus-visible color green-800
    - focus-visible outline color green-200
  - error
    - main color red-800
    - second color red-700
    - focus-visible color red-800
    - focus-visible outline color red-200

## What I've done today

### Tu 20/08/2024

- [x] created `Button, Input, Dynamic navbar` UI components
- [x] I needed to share the dynamic navbar between the home `"/"` routes and the `'/dashboard/**` routes, So it was confusing to handle the navbar that was displayed in the `Drawer.tsx` UI component of the dashboard and the main `layout.tsx` of the nextjs root, because it will duplicate if I navigate to `/dashboard/**`, However I found out that I should use the following file structure to manage the layout as I want:

  ```text
  /app
  | /(home) // don't add '/home' route
  |-- page.tsx
  |-- layout.tsx
  | /dashboard
  |-- page.tsx
  |-- layout.tsx
  | layout.tsx // the root layout of the app
  ```

### We 21/08/2024

- [x] input status
- [x] style the button status (status, variants, sizes)
- [x] customize the home page layout.
- [x] login form
- [x] changed the color palette and write the brand
- [x] login-form.tsx
- [x] avatar dropdown list more customization and its navlinks.
- [x] a lot and alot of layout changes.
- [x] style the inputs (sizes)

### Th 22/08/2024

- [x] auto overflow the drawer nav links.
- [x] adding hero component for home page.
- [x] reinforce the button component, you can using it as a link or button and added the width and loading props.

### Fri 23/08/2024

- [x] fixed the `action.tsx` redirect issue by removing the `"use server"` directive.
- [x] set up axios and endpoints reusable snippets
- [x] users table
- [x] Loading status for dashboard content
- [x] protected route using `is-auth.tsx` component
- [x] enable deploying to vercel by disable typescript error😑
- [x] title component

### Sat 24/08/2024 & Sun 25/08/2024

 facing issues while redirect the user after login, because of my wrong nextjs component usage

- [x] I need to know where to use nextjs cookies and clien cookies. done
- [x] understanding how the cookies and the composition pattern works in nextjs
- [x] change the way I display avatar-list data, I need to seperate the aciton buttons and the navlinks
- [x] set up react hook forms and yup
- [x] change none `.tsx` files to `.ts`

### Mon 26/08/2024 & Tu 27/08/2024

**notes:**
  you will encounter the following error message, it because when you pass a `null` value in the react child like mapping an array of objects, let's say we have an array of objects for users we get it from an API. In this scenario you should implement a functionality to handle this error, and if you have an key of an object let's say `address: null` you can return it this way `{address === null && "no address"}`. There is another way to break this bug, but I did not try, you can check [here](https://react.dev/reference/react/Children#children-toarray) and [here with use cases](https://github.com/facebook/react/issues/4867)

```txt
Unhandled Runtime Error

Error: Objects are not valid as a React child (found: object with keys {street, city, state, zipCode, country}). If you meant to render a collection of children, use an array instead.
```

it is hard to share the response of the catch and the try, so I should use ether RTK or React Query

- [x] return the error message from the API request for the login form.
- [x] update the api schema by the database changes
- [x] changed the `is-auth.tsx` component to an async component and add `"use server"` directive.
- [x] `is-auth.tsx` checks if the user is signed in or not using an endpoint that responds if the token is valid or not, this procedure helped me to manage the authentication process efficiantly with no depending on the cookies
- [x] create custom skeleton UI Component. it needs more enhancements

### Wed 28/08/2024 & Thu 29/08/2024

- [x] subtask: remove the navlink from the avatar list if the pathname === the navlink pathname
- [x] badge UI Component

### Sat 31/08/2024

- [x] create table, thead,tbody, tr,th,and td UI Components
- [x] add outline button variant
- [x] remove the `<Link>` feature of the `Button-with-link.tsx` UI Component and only use it as a button, and change the component name to `Button.tsx`. If you need to use the same format of the button for the nextjs's `Link` you can wrap the `Button` UI Component with the nextjs's `Link` navigation tag.

### Sun 01/09/2024

- [x] set up the initial procedures of react hook form "onChange"
- [x] instructors data
- [x] students data
- [x] departments data
- [x] subjects **data**
- [x] reinforce the table and data component
- [x] created reusable skeleton table
- [ ] user protected-routes depends on the role

### Fri 06/09/2024

- [x] refactor: `button.tsx` component now has `props.outline` prop contains `boolean` type.
- [x] refactor: `badge.tsx` component you can add variant prop

### Sat 07/09/2024

- [x] feat: message UI component for the error and success messages
- [x] reafactor: endpoints

### Sun 08/09/2024

- just strugling with server and client components pattern concept

### Mon 09/09/2024

- [x] user avatar and dropdown uses the API data to display the user details and check if the user is loggedin instead of using the token
- [x] create `drawer-container.tsx` component to use it as a parent async/await component, so I can use it to pass the data to the navbar for the user details and avatar image.
- [x] created `avatar` and `dropdown` components instead of `avatar-with-list`.

### Tu 10/09/2024

-[x] block login and register pages if the user logged in
-[x] clean up some components and unneeded files
-[x] using validToken endpoint to check if the user is logged in for the logout function instead of using tokens to have more security.

### Wed 11/09/2024

-[/] update user page. // I completed the half of this work
-[x] display the user image
-[x] `file-input.tsx` UI Component
-[x] changed the get user by id schema with the backend developer
-[x] removed the cookies from any global scope or client side components.

### Backlog

- [ ] registration page and form
- [ ] user and the current user's profile
- [ ] implement the refresh token function. bug from the backend, it returns 500 "internal server error" status instead of 204 "no content"
- [ ] in UI Components we need some times to add-on a customization while it is currentlly a customized component, thus you need to add the following snippet into the `className` of the UI Component `${props?.className}`. I need to check all the UI Components to add this feature

## UI components

- **button**: you can pass any props or attribute it will dynamically work, but you must pass the value prop
- **inputs**: you can pass any prop or attribute it will dynamically work.
- **nav**: dynamically displaying the data depending on the user status
- **user avatar with a list**: displays data and links depending on its authentication data if authenticated or not
- **logo layout**: provide some props to customize it
