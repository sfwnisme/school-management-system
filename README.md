# Notes

![Visitor Count](https://profile-counter.glitch.me/sfwnisme/count.svg)

- I will work on the UI and UI components from scratch using tailwindcss
- I will work on the SEO and SGC "static generated components" on the end of the project to save more time meanwhile.

## members:

- backend developer: [project](https://github.com/yousef132/School-Managament-System) by [@yousef132](https://github.com/yousef132)
- frontend developer: absolutely by me [@sfwnisme](https://github.com/sfwnisme)

## Add-ons tasks

- [x] Admins theme _currentlly working on it_
  - [x] full access epic
  - [x] non access epic [normal users that can not access only view]

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

It is hard to share the response of the catch and the try, so I should use ether RTK or React Query

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

- [x] block login and register pages if the user logged in
- [x] clean up some components and unneeded files
- [x] using validToken endpoint to check if the user is logged in for the logout function instead of using tokens to have more security.

### Wed 11/09/2024

- [/] update user page. // I completed the half of this work
- [x] display the user image
- [x] `file-input.tsx` UI Component
- [x] changed the get user by id schema with the backend developer
- [x] removed the cookies from any global scope or client side components.

### Sat 14/09/2024

- [x] fixed the catch block bug "I got error but the user updates the data to the server successfull" the solution was that I needed to return the status code or the data, if I returned only the response it will return nextjs's error, due to it is a server code.
- [x] refctore: button component, now you can use it as a link.
- [x] feat: file input component

### Sun 15/09/2024

- [x] feat: role-based component as a wrapper `is-role-auth.tsx`, you need only to wrap the main layout returned value and it will handle the authorization.
- [x] refactor: user's dropdown menu displays the links depends on its role.

### Mon 16/09/2024 & Tue 17/09/2024

- [x] user role update.
- [x] setting up yup schema
- [x] user delete.
- [x] button enhancements

### Wed 18/09/2024

- [x] user create.

### Sat 21/09/2024 & Sun 22/09/2024

- [x] improve the delete button. I changed the main component to client component, thus I did not needed to customize delete button client component.
- [x] reset user's password.
- [x] I created a popover for the delete button of the users; to avoid deleting users unintentionally.
- [x] enhanced the typescript deffinections and yup schemas.
- [x] I needed to replace the className attribute at the last of the UI components props to apply the additional className prop.

### Mon 23/09/2024

- [x] customize dynamic table for all the data, avoiding the duplication.
- [x] error messages for all forms, login, create user, update user and reset password
- [x] created response deffinition for the endpoints that return errors and success messages.

### Tu 24/09/2024

- [x] delete button of the `table-layer.tsx` disabled in all pages include the current user's table row, thus I need to solve this issue the next session.
- [x] instructor delete.
- [x] fix: all pages loading delay.
- [x] fix: all pages error UI.
- [x] fix: delete button visibility for current user and common ids for other tables

### Sat 28/09/2024 & Sun 29/09/2024

- [x] dynamic error handling for all the endpoints(create,update, delete, and reset password for user endpoint).
- [x] students, departments, and subjects get and delete endpoints

### Mon 30/09/2024 & Sun 06/10/2024

_Note_: why all that time in this task?
I found out that I should return a union object from the API server actions, thus I updated it about 4 times until I created the perfect function that will handle any type of data and return a dynamic object contains the important data.
what was that object contain?
I needed to make the client components more clear and readable, so I figured out that I should return the following object to help me controle the displayed data depends on the response status success, empty, or error.
the returnd response snippet

```ts
const initialObject = {
  data: {} | [],
  isEmpty: boolean,
  isSuccess: boolean,
  isError: boolean,
  message: string | {[key: string]: string}
}
```

- [x] solve the try and catch data resolves
- [x] notfound component
- [x] create error message for the endpoints `conditional-message.tsx` [canceled]
- [x] create message component for the fetch proccess `fetch-message.tsx`
- [x] I must check if the endpoints data availible then map and make logic to avoid the errors
- [x] convert the errors object to array to display the data in the jsx and check if the error message is object or string before the process. in `fetch-message.tsx` and `utils.ts`
- update all the api response with the new object schema
  - [x] `handleSignIn`
  - [x] `refreshTokenIfExpired`
  - [x] `isTokenValid`
  - [x] `getAllUsers`
  - [x] `getCurrentUser`
  - [x] `getUserById`
  - [x] `updateUser`
  - [x] `createUser`
  - [x] `deleteUser`
  - [x] `resetUserPassword`
  - [x] `getAllRoles`
  - [x] `getRolesByUserId`
  - [x] `getAllInstructors`
  - [x] `getInstructorById`
  - [x] `deleteInstructor`
  - [x] `getAllDepartments`
  - [x] `deleteDepartment`
  - [x] `getAllStudents`
  - [x] `deleteStudent`
  - [x] `getAllSubjects`
  - [x] `deleteSubject`

### Fri 11/10/2024 & Th 17/10/2024

- [x] update instructor
- [x] update department
- [x] update student
- [x] update subject
- [x] create instructor
- [x] create department
- [x] create student
- [x] create subject
- [ ] create select input UI Component
- [x] change the `user-update-form.tsx` and `user-reset-password.tsx` file like the `instructor-update-form.tsx` file
- [ ] display the supervisor and the manager in the tables of the departments and the instructors
- [x] change the typescript types file `definitions.d.ts` to `definitions.ts` as it documentation recommended
- update the following components to the new, clean and a little single-responsibility approach
  - [x] `user-update-form.tsx`
  - [x] `user-reset-password-form.tsx`
  - [x] `instructor-update-form.tsx`
  - [x] `department-update-form.tsx`
  - [x] `subject-update-form.tsx`
- [x] create a new reusable hook for the response message that I return from the API requests, thus I can use it with any place that need to return the response with a clear and readable code. _you can find the hook named `hooks/use-fetch-response.tsx`_
- create a hook that return the API data as a options for the `<select>` element to make the form component readable and more single-responsibility for the following endpoints.
  - [x] instructors
  - [x] departments
  - [x] roles
- backend issue should be solve
  - [ ] union the subject schema and adding the period columns to its Get request
  - [x] the student update return `403 forbidden` it seems the backend logic block updating this for the super admin.
  - [ ] the student update return this error message from the endpoint `NameEn: This Value Exists` even if I changed another inputs like address, anyway I notified the backend developer to debug this situation
  - [x] use `import { InferType } from 'yup'` helped me rid of duplicated interfaces. _check the `definitions.ts` file to understand more about this or you can use the following [reference](https://yup-docs.vercel.app/docs/Api/types)_
  - Note: creating reusable components helped me create all create requests forms within an hour.
  - [x] fix all the typescript errors to finalize the project and upload it.

### Backlog

- [ ] disable the dashboard sidebar depends on the user role.
- [ ] create a condition for every api request that invoked using the buttons to check if the requirements and the validation steps accomplished before invoking the request function ex: `updateUser(user:IUser)`
- [ ] forget password endpoint with the code and email.
- [ ] instructors update, create.
- [ ] user and the current user's profile.
- [ ] dynamic breadcrump.
- [ ] try and catch of the server returns into the try block of the client components
- [ ] create Input UI Component with its message and variants, this will help you achieve the Single dependency principle
- [ ] create an object contains the inputs name of the react hook forms, to help me loop the inputs instead of write them manually every type. [this task need more search to make it more typescript friendly]
- [ ] dynamic profile page for the all users data types instructors, users, students and etc....
- [ ] use `useMemo, memo, and useCallback` to maximize the performance.
- [ ] create multiple select input UI Component.
- [ ] create array of the endpoints
- [ ] I should create separated interfaces and types for every CRUD request, in purpose adopting more type-safe.
- [ ] create multiple select UI Components to handle the multi values for some endpoints like departments and students, etc...

## UI components

- **button**: you can pass any props or attribute it will dynamically work, but you must pass the value prop
- **inputs**: you can pass any prop or attribute it will dynamically work.
- **nav**: dynamically displaying the data depending on the user status
- **user avatar with a list**: displays data and links depending on its authentication data if authenticated or not
- **logo layout**: provide some props to customize it

## Common Errors

- `Error: Maximum call stack size exceeded` if you mapped the `response` from the API instead of `response.data.data`
