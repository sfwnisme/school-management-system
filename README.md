# School Management System
This project is a practical Nextjs project for those who wanna scale their native React, Nextjs, and Js skills.

## login info<br/>

[live demo](https://school-management-system-ten-tau.vercel.app/)<br/>
username: admin<br/>
password: Aa@123.123

backend resource, built by [@yousef132](https://github.com/yousef132/School-Managament-System)

[click here to see what I encounterd and what I did every day with this project](./README-V1.md)

## It's a trivial project😑, why you did it?

yes, I agree, it was a challenge doing the following:

+ Learn Nextjs from the docs only and build the project directly.
+ Avoid using libraries, just using axios, and tailwind.
+ Deep dive into typescript and meet the validations types.
+ Collaborate with backend developer and API's.
+ Building a structured native [fetchResponse function](./lib/utils.ts) and retunred schema semulates the [React Query Library](https://tanstack.com/query/latest) from scratch to make the components clear and more readable, the following snippet explains the concept

```tsx
if (isSuccess) {
    content = JsxData;
  }
  if (isEmpty) {
    content = JsxDataIsEmpty;
  }
  if (isError) {
    content = JsxDataIsError;
  } 
```
+ Building all the UI and reusable [components](./components/ui) from scratch and make them compatable with any library like [react hook form](https://www.react-hook-form.com/).
+ Never use cookies in the client components and depends on the api responses.

## What you got form this project Safwan?
+ Discovered the importance of the documentations after the youtube tutorials, thus now I can dive into any documentation confidently.
+ Native and vanilla js and react concepts for some logics like data fetching and how I can make theme natively.
+ System design and the best practice creating reusable and UI components.
+ finally: it was enjoyable experience😅 dealing with only documentations and rid of youtube 100 hours😑 tutorials.

Note: not all youtube's tutorials bad, but as a software engineer you must depends on the original source "docs" then you can use other ones
