# Anonymous Messaging App

Welcome to the Anonymous Messaging App, an application designed to facilitate secure, anonymous communication between users. This project is built using Next.js, TypeScript, MongoDB, and integrates Google Generative AI APIs for generating messages.

## Features

- **Anonymous Messaging**: Users can send and receive messages without revealing their identity.
- **Secure Authentication**: Secure user sessions with JWT and NextAuth.
- **Schema Validation**: Ensures data integrity using Zod for schema validation.
- **Database**: MongoDB for efficient and scalable data storage.
- **Generative AI**: Integration with Google Generative AI APIs to enhance messaging capabilities.

## Live Demo

Check out the live demo of the application: [Anonymous Messaging App](https://anonymous-feedback-rho.vercel.app/)

## Technologies Used

- **Next.js**: A React framework for building server-side rendering and static web applications.
- **TypeScript**: A statically typed superset of JavaScript.
- **MongoDB**: A NoSQL database for storing messages and user data.
- **JWT**: JSON Web Tokens for secure authentication.
- **NextAuth**: Authentication for Next.js applications.
- **Zod**: TypeScript-first schema declaration and validation library.
- **Google Generative AI APIs**: Used to generate messages.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash

   git clone https://github.com/your-username/anonymous-messaging-app.git
   cd anonymous-messaging-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root of the project and add the following environment variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Usage

1. **Sign Up / Log In**: Users can sign up or log in using their credentials.
2. **Send Messages**: Users can send anonymous messages to other users.
3. **Receive Messages**: Users can view messages sent to them anonymously.
4. **AI-Generated Messages**: Utilize the Google Generative AI API to generate messages.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## Current Issue
I am trying to use resend in the deployed version of this app 


## Contact

If you have any questions, feel free to reach out:

- **Name**: Devansh Karamchandani
- **LinkedIn**: [Devansh Karamchandani](https://www.linkedin.com/in/devansh-karamchandani-32a083243/)
- **Portfolio**: [hire-me-tawny.vercel.app](https://hire-me-tawny.vercel.app/)

---
