# The bradery test: E-Commerce Platform

## Overview

This repository contains the code for the technical test of The bradery: a full-stack e-commerce platform. The backend is built with NestJS and MySQL, providing rest API endpoints for handling user authentication, product management, and order processing. The frontend is developed using React with Vite and Chakra UI for a responsive and modern user interface. The entire application is containerized using Docker for easy deployment and development.

## Features

- User authentication.
- Product listing.
- Shopping cart functionality (add, delete).
- Order processing.
- Dockerized environment for both development and production.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. **Clone the Repository**

    ```
    git clone https://github.com/Malek-Ghorbel/TheBradery-Test.git
    cd  TheBradery-Test
    ```

2. **Docker Compose**

    To start the entire application stack, run the following command from the root of the project:

    ```
    docker-compose up --build
    ```

    This will set up the backend, frontend, and MySQL database and you're ready to go you can create a user and add products (which are automatically added at the start of the application).

## Usage

- Access the web application at `http://localhost:5173`.
- The backend API is available at `http://localhost:5000`.

## Dockerization

The application is fully dockerized for easy setup. The `docker-compose.yml` file at the root of the project configures the necessary services:

- Frontend: React application.
- Backend: NestJS server.
- Database: MySQL database.

