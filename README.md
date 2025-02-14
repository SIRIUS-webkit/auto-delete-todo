# Auto-Delete Todo List with Next.js and TypeScript

This project is a dynamic todo list application built using Next.js, TypeScript, and styled with Tailwind CSS. It demonstrates several key features:

- **Interactive List:** A main list of items that can be clicked.
- **Categorized Columns:** Items are dynamically moved into categorized columns (Fruits or Vegetables) upon being clicked from the main list.
- **Automatic Return:** Items in the categorized columns automatically return to the main list after 5 seconds.
- **Immediate Return:** Clicking an item in a categorized column immediately returns it to the main list.
- **Data Fetching (Optional):** Fetches user data from an external API, transforms, and groups it by department.
- **Unit Testing:** Includes unit tests using Jest and React Testing Library to ensure application reliability.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Development Server](#running-the-development-server)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [API Endpoint (Optional)](#api-endpoint-optional)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic List Management:** Efficiently manages todo items across different categories.
- **Tailwind CSS Styling:** Provides a clean and responsive user interface.
- **TypeScript:** Ensures type safety and improves code maintainability.
- **Automated Testing:** Includes Jest and React Testing Library for comprehensive unit tests.
- **API Data Transformation (Optional):** Groups and transforms user data fetched from an external API.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building performant web applications.
- [TypeScript](https://www.typescriptlang.org/) - Adds static typing to JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- [Jest](https://jestjs.io/) - JavaScript testing framework.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Provides utilities for testing React components.
- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) - Package managers.

## Setup and Installation

1.  **Clone the repository:**

    ```
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    Using NPM:

    ```
    npm install
    ```

    Using Yarn:

    ```
    yarn install
    ```

## Running the Development Server

To start the Next.js development server, run:

Using NPM:
```
npm run dev

```

Using Yarn:

```
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Running Tests

To execute the unit tests, use the following command:

Using NPM:

```
npm run test

```

Using Yarn:

```
yarn test

```

This command runs Jest in watch mode, automatically re-running tests on file changes.

## Project Structure

The project structure is organized as follows:

```

├── components/ # Reusable React components

├── pages/

│ ├── api/ # API routes (optional, for data fetching)

│ │ └── department.ts # Example API route to fetch and transform data

│ ├── index.tsx # Main page component

│ └── \_app.tsx # Custom App component to include Tailwind CSS

├── public/ # Static assets

├── styles/

│ └── globals.css # Global CSS file (for Tailwind imports)

├── jest.config.ts # Jest configuration file

├── jest.setup.ts # Jest setup file

├── package.json # Project dependencies and scripts

├── README.md # Project documentation

└── tsconfig.json # TypeScript configuration file

```

## API Endpoint (Optional)

The project includes an optional API endpoint (`pages/api/department.ts`) that fetches data from the [DummyJSON Users API](https://dummyjson.com/users) and transforms it.  If you choose to implement this feature, the endpoint groups user data by department, providing summaries of gender, age range, hair color, and postal codes.

To access the API endpoint in development, visit:

```
http://localhost:3000/api/department

````

## Deployment

This Next.js application can be easily deployed to platforms like Vercel, Netlify, or any other Node.js hosting provider.

### Vercel

1.  Sign up or log in to [Vercel](https://vercel.com/).
2.  Install the Vercel CLI:

    ```
    npm install -g vercel
    ```

3.  Deploy your project by running `vercel` in your project directory.

Vercel automatically detects that it is a Next.js project and deploys it accordingly.



