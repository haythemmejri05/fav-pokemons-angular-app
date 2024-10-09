# Favorite Pokemons Application

## Overview

This app simulates Pokemon battles, allowing users to create teams and engage in fights, all built with **Angular**, **TypeScript**, and **Bootstrap**.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Frontend App](#frontend-app)
6. [Backend API](#backend-api)
7. [Database Schema](#database-schema)
8. [Contributing](#contributing)

## Technologies Used

### Frontend

- **Angular:** Main framework for building the app's user interface (version used is Angular 18.2.7)
- **TypeScript:** Strongly typed language built on JavaScript
- **Bootstrap:** Enables responsive design and styling (Used Bootstrap v5)

### Backend

- **Node.js:** Provides strong typing to JavaScript (version used 18.19.1)
- **Express.js:** Framework for building server-side APIs
- **Javascript:** For backend logic and API development
- **Supabase:** Handles the PostgreSQL database and authentication of users

### Development Tools

- **ESLint:** For code consistency and linting
- **Prettier:** Code formatter for maintaining style consistency

## Features

- Register and log in to access the app.
- Browse a complete list of Pokemons, including their power and life stats.
- View detailed information for any specific Pokemon
- Update Pokemon details with edits
- Explore all teams and see each team's total power
- Create a new team by choosing a name and selecting 6 Pokemons
- Simulate battles between two teams, monitor each round’s progress, and determine the victorious team

## Installation

### Prerequisites

- Angular CLI (recommended  v18.2.7)
- Node.js (recommended v18.19.1)
- Git

### Steps

1. Clone the repository:

```bash
git clone https://github.com/haythemmejri05/fav-pokemons-app.git
cd fav-pokemons-app
```

2. Install dependencies:

```bash
nvm install
```

3. Setup the database:

- Create a new project at https://supabase.com/
- Import the `init_db.sql` file into your project to create and fill the tables
- Retrieve Supabase credentials (URL & key) and put the values into a `.env` inside the `api-server` folder (the variables should be named SUPABASE_URL & SUPABASE_KEY)

4. Run the backend API:

- Open a new terminal and go under `api-server` folder
- Install dependencies with

```bash
npm install
```

- Run the server

```bash
npm start
```

## Usage

- Open a new terminal and go under the root folder of the project
- Run the application

```bash
npm start
```

- Open [http://localhost:4200](http://localhost:4200) on your web browser to explore the frontend application
- Log in or create a new account
- Check the list of all pokemons and teams
- Create your own team and simulate battles!

## Frontend App

Here is an overview of the all routes in the application:

- /sign-in - User authentication
- /sign-up - User registration
- /pokemons - Displays a list of all available Pokemons
- /pokemons/view/:id - View details of a specific Pokemon
- /pokemons/edit/:id - View details of a specific Pokemon
- /teams - Shows all teams with their total power
- /team/new - Add a new team by selecting a name and six Pokemons
- /battle/team-select - Select 2 teams to start a battle
- /battle/fight-rounds/team1/:team1/team2/:team2 - Simulate a battle between two teams

## Backend API

Here are the key API routes used by the application:

- `GET /api/pokemons` - Retrieves the list of all Pokemons and their details
- `POST /api/pokemons` - Create a new Pokemon
- `PUT /api/pokemons/:id` - Updates a specific Pokemon according to the specified ID
- `DELETE /api/pokemons/:id` - Delete a specific Pokemon according to the specified ID
- `GET /api/pokemon-types` - Retrieves the list of all Pokemon types
- `GET /api/teams` - Lists all teams along with their Pokemons
- `POST /api/teams` - Create a new team
- `GET /api/weakness` - Lists all Pokemon weakness factors
- `POST /api/sign-in` - User authentication
- `POST /api/sign-up` - User registration

## Database Schema

- Check `init_db.sql` file for the structure of the database

## Contributing

We welcome contributions to improve this project! Whether you’re fixing bugs, adding new features, or enhancing documentation, your input is valuable. To contribute:

1. Fork the repository and create a new branch
2. Make your changes
3. Ensure your code follows the project’s coding standards
4. Submit a pull request, providing a clear description of the changes
5. Before contributing, please review the [Contributing Guidelines](./CONTRIBUTING.md) to understand our process and expectations
