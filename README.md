# TWC TEST WEB (Simple Contacts Management Web Application)

## Description

The Contact Management System is a sophisticated Vite.js web application designed to streamline and enhance the way users manage their contacts. Built with a focus on user experience and efficiency, this application provides a simple solution for organizing, accessing, and managing contact information with ease.

## Demo

https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/fa53f87e-2313-4d3d-a896-654d0f317c65

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

  1. Clone the repository (API):
     ```
     git clone https://github.com/Niraj-Dilshan/twc-test-api.git
     ```
  2. Open directory:
     ```
     cd twc-test-api
     ```
  3. Install dependencies:
     ```
     npm install
     ```
  4. Set up the .env file:
     ```
     cp .env.example .env
     ```
  5. Update the .env file with the following information:
     ```
     PORT=3001 #port number
     MONGODB_URI=mongodb://localhost/db #mobgodb url
     SECRET_KEY=SecretKey #secret key
     ```
  6. Back to root directory
     ```
     cd ..
     ```
  7. Clone the repository (Web):
     ```
     git clone https://github.com/Niraj-Dilshan/twc-test-web.git
     ```
  8. Open directory:
     ```
     cd twc-test-web
     ```
  9. Install dependencies:
     ```
     npm install
     ```
  10. Set up the .env file:
      ```
      cp .env.example .env
      ```
  11. Update the .env file with the following information:
      ```
      VITE_API_URL=http://localhost:3001 # path to user api
      ```

### How to start 

  1. Open directory(API):
     ```
     cd twc-test-api
     ```
  2. Start API:
     ```
     npm start
     ```
  3. Open directory(WEB):
     ```
     cd twc-test-web
     ```
  4. Start Web:
     ```
     npm run dev
     ```
## Showcase

  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/fa771927-f623-406c-8ba4-f6695e24ff0b" alt="login-page">
    <br>
    <strong>Login Page</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/a04485e1-9c24-4a33-a301-02e455bfef34" alt="registration-page">
    <br>
    <strong>Register Page</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/031abc58-db5c-42f3-85ba-981bed58238c" alt="welcome-page">
    <br>
    <strong>Welcome Page</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/017723d1-6f16-4935-8abe-f04f85869cd1" alt="add-new-contact-page">
    <br>
    <strong>Contact Adding Page</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/b2f0a2f2-662b-4ed8-854e-ea31b13b9816" alt="view-contact-page">
    <br>
    <strong>View Contact Page</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/297cf612-75b6-45db-aac6-4e665853528a" alt="edit-contact">
    <br>
    <strong>Edit Contact</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/9da35d5e-1a71-49e3-b7bc-0f10d635851f" alt="edit-contact-sucess">
    <br>
    <strong>Edit Contact Sucess</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/9da35d5e-1a71-49e3-b7bc-0f10d635851f" alt="contact-delete">
    <br>
    <strong>Contact Delete</strong>
  </p>
  <p align="center">
    <img src="https://github.com/Niraj-Dilshan/twc-test-web/assets/61787989/4e8c61b9-373f-4865-9c66-592403563b9a" alt="contact-delete-sucess">
    <br>
    <strong>Contact Delete Sucess</strong>
  </p>
