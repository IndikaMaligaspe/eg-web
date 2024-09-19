# React JWT Authentication App

This is a React application that provides user authentication with sign-in and sign-up functionality using JWT (JSON Web Token). The app is built using the React Context API to manage authentication state, with environment variables managed via `.env` files. All styling is done using `react-bootstrap`.

## Features

- **JWT-based Authentication**: Secure sign-in and sign-up.
- **React Context API**: Used to manage authentication state across the app.
- **Protected Routes**: Authenticated routes managed through the `auth` directory.
- **Environment Variables**: Managed via `.env` files for sensitive configurations.
- **Modular Folder Structure**: Well-organized folder structure for easy scalability.
- **Styling**: Uses `react-bootstrap` for styling components.

## Folder Structure
- └── src/ 
- - ├── API/ # Handles all API calls (login, register, etc.) 
- - ├── auth/ # Contains authenticated routes and route guards 
- - ├── components/ # Reusable common components and styled compo nents 
- - ├── context/ # React Context API (AuthContext for authentication) 
- - ├── hooks/ # Custom hooks for logic abstraction 
- - ├── pages/ # Feature pages like SignIn, SignUp, Dashboard, etc. 
- - ├── public/ # Public files (index.html, etc.) 
- ├── App.js # Main entry point of the app └── index.js # Renders the app


## Technologies Used

- **ReactJS**
- **React Context API** for state management
- **JWT** for authentication
- **React-Bootstrap** for responsive UI components
- **Axios** for API calls

## Setup Instructions

### Prerequisites

- Node.js (version 14.x or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-jwt-auth.git
   cd react-jwt-auth

2. Install dependancies
    ```bash
    npm install
    ```
3. Set up environment variables:
Create a .env file in the root directory with the following variables:

    ```bash
    REACT_APP_API_BASE_URL=your-api-url
    ```

4. Start the development server:
    ```bash
    npm install
    npm run start
    ```

The app will be running on http://localhost:3000.


