<a href="#"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="next.js-badge"/></a> 
# <a href="#"><img src="/docs/favicon.ico" width="24"/></a> Cazzle | <a href="#" target="_blank"> <strong>Live</strong></a>

> ### Property Portal built with Next.js

<br>
<div align="center">
  <a href="#"><img src="docs/readme_hero.jpg" width="900"/></a>
  
  ###
  <a href="#"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="next.js-badge"/></a> 
  <a href="#"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react-badge"/></a>
  <a href="#"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript-badge"/></a>   
  <br>
</div>

<br>

## About
**Cazzle** is real-estate property portal made in <a href="https://github.com/vercel/next.js">**Next.js**</a>

The application utilises <a href="https://github.com/get-convex/convex-js">**Convex**</a> for database and storage, <a href="https://github.com/clerk/javascript">**Clerk**</a> for authentication and <a href="https://github.com/mui/material-ui">**Material UI**</a> for Components and layouts. Combining these tools with Next.js 14 <a href="https://nextjs.org/docs/app/building-your-application">**App router**</a>, <a href="https://github.com/facebook/react">**React**</a> and <a href="https://github.com/Microsoft/TypeScript">**TypeScript**</a> creates a powerful stack to build with. 

<br>

## 📝 Features
<table>
  <thead>
  </thead>
  <tbody>
    <tr>
      <td><strong>🔹 Browse Listings</strong></td>
      <td>Refine results using filters</td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td><strong>🔹 Authentication</strong></td>
      <td>User sign-in/sign-up flows</td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td><strong>🔹 User Favourites</strong></td>
      <td>Add/remove property listings</td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td><strong>🔹 User Page</strong></td>
      <td>View favourited listings</td>
    </tr>
    <tr><td colspan=2></td></tr>
    <tr>
      <td><strong>🔹 Responsive Design</strong></td>
      <td>Adaptive to device viewport</td>
    </tr>
    <tr><td colspan=2></td></tr>      
  </tbody>
</table>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔬 Overview

### Planning
Planning involved researching similar property portals such as <a href="https://www.rightmove.co.uk/">Rightmove</a> and <a href="https://keaze.com/">Keaze<a/>. Alongside their websites, both had excellent documentation about thier APIs which were invaluable while developing the application schema. 

<details open>
  <summary><h3>UI Wireframes</h3> </summary>

  User interface (UI) wireframes were created during the pre-development planning phase to visualise how data would need to be displayed
  
  <br>
  <a href="#"><img src="docs/planning.webp" width="900"/></a>
</details>

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

##

### Context Providers
Convex, Clerk and Material UI provision access to their respective APIs via React Context Providers. 

```tsx
const ConvexClerkProvider = (props: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {props.children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
```

##

### Authentication Flows
Clerk Auth makes implementing authentication straightforward and offers email as well as social authentication. Clerk provides serveral React/Next Components to streamline development. 

<a href="#"><img src="docs/auth.jpg" width="900"/></a>

##

### Signed-Out | Signed-In

<a href="#"><img src="docs/menu.jpg" /></a>
<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Users
Clerk makes available the User object provisioned with **claims** which contains properties such as as user_id and role. 

Within the application, a session token is used to validate user identity when accessing protected areas and performing activities such as viewing favourites.

### Onboarding & Permissions
Users creating an account for the first time have the option to choose either a standard user account or branch account. Depending on which account is chosen, a role is then attributed to the current user which is used throughout the application to authorize and permit actions. 

A **standard user account** grants the user the ability to favourite real-estate properties while browsing the site which can be accessed via the favourites page. A non signed-in user when trying to favourite a listing is prompted to sign-in or create an account.

A **branch account** grants the user the ability to manage a property portfolio via the built-in dashboard.
> Note 📡
> 
> Branch account access is currently work in progress

<br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Responsive web design
> #### Details 📡
Material UI offers a powerful React Component library. As MUI Components create classes at compile time, styling is applied inline via the **sx** prop. Media queries can be set using the MUI provided hook or other means. Although this offers some advantages over CSS such that styling is composed with the Component, as NextJs renders serverside first, browser APIs are unavailable initially meaning elements display incorrectly.

##

### Environment

<a href="#"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="nodjs-badge"/></a>

### Build Tools

<a href="#"><img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" alt="webpack-badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black" alt="babel-badge"/></a>

### Developer Tools

<a href="#"><img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm-badge"/></a>
<a href="#"><img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="vscode-badge"/></a>

##

### Deployment

<a href="#"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel-badge"/></a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
