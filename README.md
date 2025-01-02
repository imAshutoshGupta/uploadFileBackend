# Docunent Uploader Project

## Table of Contents
<!-- 
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Contributing](#contributing)
8. [License](#license) -->

## Project Overview

This is a MERN (MongoDB, Express, React, Node.js) project that helps you build a basic full-stack web application, covering user authentication, document management, and file handling.

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)
* MongoDB (version 4 or higher)
* npm (version 6 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/imAshutoshGupta/uploadFileBackend.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Project Structure

The project is divided into two main directories: `client` and `server`.

* `frontend`: Contains the React frontend code.
* `backend`: Contains the Express backend code.

## Features

* 1 : User Registration: Allow new users to sign up with their details (e.g., username, email, 
password).
* 2 : User Login: Implement a login system that authenticates users with their credentials .
* 3 : User Logout: Enable users to log out of their accounts securely.
* 4 : Dashboard: After login, the user should see a dashboard displaying:
       A list of previously uploaded documents (if any).
       Options to view individual documents.
       An option to upload new documents.
* 5 : Document Upload: Provide a file upload functionality to allow users to upload new 
documents
* 6 : Document Viewing: Display uploaded documents in a readable format (e.g., text, PDF 
viewer).

## Additional Features

* 1 : Add pagination and a search bar for the document list.
* 2 : Added a Admin role (hardcoded as requested)
* 3 : Added forgot password and reset password functionality using link sent on your email.
* 4 : File types and file size validation.