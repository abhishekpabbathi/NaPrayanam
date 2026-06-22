# ✈️ NaPrayanam – Intelligent Travel Planning Platform

## Overview

NaPrayanam is an intelligent travel planning platform designed to simplify the complete travel preparation process. The platform transforms destination ideas into organized travel experiences by providing personalized itineraries, budget planning, accommodation recommendations, packing assistance, and trip management capabilities through a unified dashboard.

The solution helps travelers plan smarter, reduce preparation time, manage travel expenses efficiently, and organize every stage of their journey from a single platform.

---

## Problem Statement

Travel planning often requires users to switch between multiple websites and applications for itinerary creation, budget calculations, accommodation research, packing preparation, and trip organization.

This fragmented process increases planning effort, consumes time, and makes travel management difficult.

NaPrayanam addresses this challenge by providing a centralized platform that streamlines the entire travel planning workflow.

---

## Key Features

### User Management

* Secure User Registration
* User Authentication
* JWT Authorization
* Protected Routes
* Session Management

### Trip Management

* Create Travel Plans
* View Trip Details
* Manage Personal Trips
* Delete Trips
* Travel Dashboard

### Travel Planning

* Personalized Itinerary Generation
* Budget Estimation
* Accommodation Recommendations
* Packing Checklist Generation
* Day-wise Activity Planning

### Dashboard & Analytics

* Travel Statistics
* Trip Summary
* Budget Overview
* Quick Access Navigation

---

## System Architecture

```text
Frontend (React.js)
        │
        ▼
REST API Layer
        │
        ▼
Backend (Node.js + Express.js)
        │
        ▼
MongoDB Database
```

---

## Architecture Flow

```text
User
 │
 ▼
React Frontend
 │
 ▼
Axios API Requests
 │
 ▼
Express Server
 │
 ▼
Authentication Middleware
 │
 ▼
MongoDB Database
 │
 ▼
Response Returned To User
```

---

## Project Structure

```text
NaPrayanam
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   └── routes
│   └── package.json
│
└── README.md
```

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* JavaScript (ES6)
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## API Modules

### Authentication APIs

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Trip Management APIs

```text
GET      /api/trips
POST     /api/trips
GET      /api/trips/:id
PUT      /api/trips/:id
DELETE   /api/trips/:id
```

---

## Security Features

* JWT Authentication
* Protected API Endpoints
* Password Encryption
* User-Specific Data Access
* Authorization Middleware
* Secure Session Handling

---

## Deployment

### Frontend

* React.js Single Page Application
* Responsive User Interface
* Production Ready Build

### Backend

* REST API Service
* Authentication Layer
* Business Logic Processing
* Database Connectivity

### Database

* MongoDB Atlas
* Cloud Data Storage
* Scalable Data Management

---

## Future Roadmap

* AI-Based Travel Recommendations
* Smart Destination Discovery
* Weather Forecast Integration
* Expense Tracking System
* Interactive Maps Integration
* Collaborative Trip Planning
* Travel Analytics Dashboard
* Mobile Application Support

---

## Business Value

NaPrayanam enables travelers to:

* Reduce travel planning effort
* Organize trips efficiently
* Estimate travel expenses accurately
* Discover accommodation options
* Prepare travel essentials
* Manage complete travel journeys from a single platform
* Improve overall travel planning experience

---

## Developed By

**Abhishek Pabbathi**

Full Stack Developer | React.js | Node.js | MongoDB | REST APIs
