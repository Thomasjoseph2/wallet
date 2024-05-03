# Project Title: Wallet Management System

This project is a wallet management system built using NestJS, utilizing PostgreSQL for data storage with Prisma ORM. The database is hosted on Supabase, and the application is deployed on an AWS EC2 instance connected to the domain `https://thomasjoseph.online`.

## Features

- **Authentication System**: Secure signup and login functionalities.
- **User Profile Management**: Users can view and manage their profiles.
- **Wallet Operations**: Users can check balances, add money, and withdraw money from their wallets.
- **Transaction History**: Users can view a list of all wallet transactions.
- **Security**: Uses JWT for authentication and blacklists tokens on logout to prevent reuse.

## Database Schema

The database includes the following tables:
- `users`: Stores user data.
- `blacklisted_tokens`: Stores JWTs that are no longer valid.
- `wallets`: Stores user wallet information.
- `transactions`: Stores transaction history related to user wallets.

## Modules

The application is organized into the following modules:
- **Authentication**: Handling user authentication.
- **Users**: Management of user profiles and data.
- **Wallet**: Operations related to user wallets.
- **Welcome Page**: A simple route to confirm the server is running.
- **Prisma Module**: Manages the Prisma service and database interactions.

## API Endpoints

### Welcome Page

- **GET** `/` 
  - Description: Returns a server started string.
  - Example: `https://thomasjoseph.online`

### Authentication

- **POST** `/auth/signup`
  - Description: Register a new user.
  - Payload: `email`, `password`, `firstName`, `lastName`
  - Example: `https://thomasjoseph.online/auth/signup`

- **POST** `/auth/signin`
  - Description: Login for existing users.
  - Payload: `email`, `password`
  - Example: `https://thomasjoseph.online/auth/signin`

- **POST** `/auth/logout`
  - Description: Logout the current user and blacklist the token.
  - Example: `https://thomasjoseph.online/auth/logout`

### User Profile

- **GET** `/users/profile`
  - Description: Fetch the current user's profile.
  - Example: `https://thomasjoseph.online/users/profile`

### Wallet Operations

- **GET** `/wallet/get-balance`
  - Description: Retrieve the current balance of the user's wallet.
  - Example: `https://thomasjoseph.online/wallet/get-balance`

- **POST** `/wallet/add-amount`
  - Description: Add money to the user's wallet.
  - Payload: `amount`
  - Example: `https://thomasjoseph.online/wallet/add-amount`

- **POST** `/wallet/withdraw-amount`
  - Description: Withdraw money from the user's wallet.
  - Payload: `amount`
  - Example: `https://thomasjoseph.online/wallet/withdraw-amount`

### Transaction History

- **GET** `/users/transactions`
  - Description: Get a list of all transactions related to the user's wallet.
  - Example: `https://thomasjoseph.online/users/transactions`

## Usage

For all POST and GET routes, except the welcome route, signup, and login, you must include the bearer token received from the response when you sign in or sign up. Add this token to Postman's Authorization header.

## Deployment

This application is deployed on an AWS EC2 instance and is accessible through the domain [thomasjoseph.online](https://thomasjoseph.online).

## Local Development

To run this project locally, follow these steps:
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up your environment variables in a `.env` file, including `DATABASE_URL`.
4. Run the server with `npm start`.
5. if you have docker installed in your system provide the password for the postgress db in dockercompose.yml file and run the container you can use the container url to run the project if you dont want to use a outside db.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.
