# Evently

## Overview
Evenly is a web application built for managing events and guest lists, inspired by Partiful. It provides CRUD functionality for events and their guests, integrates with third-party APIs, and includes user authentication.

## Requirements Recap:

- Backend: Django
- Frontend: React
- CRUD resources: Events, Guests
- 3rd Party APIs: At least 2
- Authentication: Django Rest Framework Token Authentication
- Deployment: AWS

## Features
- **Event Management:**
  - Create, Read, Update, Delete (CRUD) operations for events.
  - Events have a title, description, date, location, and associated host (user).
- **Guest Management:**
  - Guests can be added to events with their name and email address.
- **Authentication:**
  - Token-based authentication using Django REST Framework's Token Authentication.
- **Third-Party APIs:**
  - Integration with at least two third-party APIs for enhanced functionality (e.g., Google Maps API for event locations, Eventbrite API for event details).
- **Additional Features:**
  - Search events and filter results.
  - Provide alerts for event updates and invitations.

#### Database Schema

<!-- ![Database Schema](backend/db_schema.png) -->
