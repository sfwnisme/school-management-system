# Notes

- I will work on the UI and UI components from scratch using tailwindcss

## What I've done today

### Tu 20/08/2024

- created `Button, Input, Dynamic navbar` UI components
- I needed to share the dynamic navbar between the home `"/"` routes and the `'/dashboard/**` routes, So it was confusing to handle the navbar that was displayed in the `Drawer.tsx` UI component of the dashboard and the main `layout.tsx` of the nextjs root , because it will duplicate if I navigate to `/dashboard/**`, However I found out that I should use the following file structure to manage the layout as I want:

  ```
  /app
  | /(home) // don't add '/home' route
  |-- page.tsx
  |-- layout.tsx
  | /dashboard
  |-- page.tsx
  |-- layout.tsx
  | layout.tsx // the root layout of the app
  ```

## UI components

- **button**: you can pass any props or attribute it will dynamically work, but you must pass the value prop
- **inputs**: you can pass any prop or attribute it will dynamically work.
- **nav**: dynamically displaying the data depending on the user status
- **user avatar with a list**: displays data and links depending on its authentication data if authenticated or not
- **logo layout**: provide some props to customize it
