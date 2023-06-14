# BOOKMART

# Overview

This is a simple web application that allows users to search for secondhand books, add them to their cart, and checkout.

# Built With

- Frontend
  - [Next.js](https://github.com/vercel/next.js) - React framework
  - [Clerk](https://github.com/clerkinc/javascript) - For auth
  - [UploadThing](https://github.com/pingdotgg/uploadthing) - For uploading files
  - [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) - For styling
  - [Shadcn/ui](https://github.com/shadcn/ui) - for UI components
- Backend
  - Node.js
  - Express
  - MongoDB
  - TypeScript
  - [Clerk](https://github.com/clerkinc/javascript) - For auth

# Get Started

## Prerequisites

- Make sure that you have nodejs is installed on your machine by running `node -v`.
- Also you should have npm ( Node Package Manager) installed by running `npm -v`.
- Make sure to set a MongoDB database.
- Make sure to set up a Clerk account and create a Clerk application.

## Installation

Since this project will hold both the client application and the server application there will be node modules in two different places.

- Run `npm install` in both :file_folder: **backend** and :file_folder: **frontend** folders.
- Add your `.env` file following the **.env.example** in the :file_folder: **backend** folder as well as the frontend one.

## Usage

- backend
  - Run `npm run dev` to start the server.
- frontend
  - Run `npm run dev` to start the client application.
