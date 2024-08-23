# Notes

![Visitor Count](https://profile-counter.glitch.me/sfwnisme/count.svg)

- I will work on the UI and UI components from scratch using tailwindcss

## Add-ons tasks

- change the way of handling the avatar-list navlinks array of object, and make it more efficient.

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

### Sat 24/08/2024

- [ ] users table
- [ ] registration page and form
- [x] fixed the `action.tsx` redirect issue by removing the `"use server"` directive.
- [ ] set up cookies reusable functions. <code style="color:red">Bug, it removes the token after rerendering when I use the functions that I made for tokens and cookies</code>
- [x] set up axios and endpoints reusable snippets
- [ ] change the way I display avatar-list data, I need to seperate the aciton buttons and the navlinks
- [ ] add outline button variant

## UI components

- **button**: you can pass any props or attribute it will dynamically work, but you must pass the value prop
- **inputs**: you can pass any prop or attribute it will dynamically work.
- **nav**: dynamically displaying the data depending on the user status
- **user avatar with a list**: displays data and links depending on its authentication data if authenticated or not
- **logo layout**: provide some props to customize it
