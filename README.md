# API Documentation

## Overview
This API allows users to create, read, update, and delete items from a database, using TypeScript and Express.js.

## Getting Started
- Prerequisites (Node.js, npm, TypeScript, MongoDB)
- Installation steps (clone the repo, install dependencies, set environment variables, run the server)

## API Endpoints

### Authentication
- Register a new user: `POST /auth/register`
  - Request body: `{ "email": "user@example.com", "password": "your_password" }`
- Login: `POST /auth/login`
  - Request body: `{ "email": "user@example.com", "password": "your_password" }`

### Items
All item endpoints require authentication. Include the JWT token in the `Authorization` header as `Bearer <token>`.

- Create a new item: `POST /items`
  - Request body: `{ "name": "item_name", "description": "item_description" }`
- Get all items: `GET /items`
- Get an item by ID: `GET /items/:id`
- Update an item by ID: `PUT /items/:id`
  - Request body: `{ "name": "new_item_name", "description": "new_item_description" }`
- Delete an item by ID: `DELETE /items/:id`
