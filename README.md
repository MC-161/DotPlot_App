
![sonoLogo](https://github.com/user-attachments/assets/27aa7a1c-4e35-4a82-9e1e-8f63ff80f3df )

# Sonomon

## Web App
You can access the app [here](https://link-to-your-app.com).

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Overview

Sonomon is a desktop application designed for hospital staff to efficiently manage patient data and visualize ultrasound images with detected breast lesions. It combines robust data management with intuitive visualization tools to support doctors in diagnosing and monitoring patients.

## Key Features

### Patient Data Management
- **Functionality**: Add, update, view, and delete patient records.
- **Endpoints**: Provides comprehensive CRUD operations through secure API endpoints.

### Ultrasound Image Management
- **Functionality**: Upload, view, and manage ultrasound images, including detailed visualizations of breast lesions.
- **Endpoints**: Supports various operations for ultrasound scans, including retrieving images.

### General Torso Visualization
- **3D Model**: Displays a 3D model of the patient’s torso with interactive features to highlight and examine breast lesions.
- **Patient Overview**: Provides a visual overview of patient information alongside the torso model.

### User Interface
- **Dashboard**: Displays key statistics such as total scans, total patients, and recent patient activity.
- **Patient Search**: Allows for efficient searching of patient records.
- **Forms**: Includes forms for managing patient details and uploading new scans.

### Database Security
- **Secure Storage**: Utilizes MongoDB for storing patient data securely, ensuring data integrity and privacy.
- **JWT Authentication**: Uses JWT tokens for authentication, with tokens expiring every hour to enhance security and prevent unauthorized access.

### Backend Processing
- **Technology**: Built with Node.js and Express for handling data operations and secure API interactions.

## How the Application Meets the Requirements

### Input Management
- **Patient Details**: Allows staff to manage patient records comprehensively.
- **Ultrasound Images**: Provides robust tools for handling ultrasound images and detecting breast lesions.

### General Torso Visualization
- **3D Model Display**: Integrates patient data with ultrasound images to provide a detailed overview.

### User-Friendly Desktop Framework
- **Desktop Application**: Developed for ease of use by hospital staff.
- **Forms and GUI**: Provides intuitive forms and a clean interface tailored for desktop usage.

### Secure Database and Authentication
- **Database Security**: Employs MongoDB and JWT tokens to protect patient data and manage access securely.
- **Token Expiration**: JWT tokens expire every hour to enhance security by limiting the duration of access.

## Summary

Sonomon delivers a powerful solution for managing patient data and visualizing ultrasound images with breast lesions. By providing an intuitive user interface, secure data handling, and a dynamic visualization tool, it supports hospital staff in their diagnostic and management tasks effectively. The use of JWT token expiration further strengthens security, ensuring that access to patient data is tightly controlled.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **JWT**
- **React**
- **TypeScript**
- **Vite**
- **Mocha and Chai**
- **Sinon**
- **React Router DOM**
- **Shadcn**
- **MUI Icons**
- **Tailwind CSS**

## Screenshots

### Login Screen
<img width="1324" alt="Screenshot 2024-07-28 at 14 29 31" src="https://github.com/user-attachments/assets/18ba5fcc-f2ef-4c80-9418-1f2627d10963">

### Dashboard
<img width="1357" alt="Screenshot 2024-07-28 at 12 23 36" src="https://github.com/user-attachments/assets/0efbad92-50a9-4992-be6f-3fa7f47f0e2f">

### Patient Search
<img width="1357" alt="Screenshot 2024-07-28 at 12 23 48" src="https://github.com/user-attachments/assets/27856251-d4eb-49f6-97f5-83f9f11df432">


### Patient View
<img width="1357" alt="Screenshot 2024-07-28 at 12 28 33" src="https://github.com/user-attachments/assets/df267f4d-f46b-4506-b205-2dc6598ecca3">


### Patient Edit
<img width="1357" alt="Screenshot 2024-07-28 at 12 28 51" src="https://github.com/user-attachments/assets/14fe45fd-3f90-4cd9-b6c3-c52327cb178a">

### Patient Delete
<img width="1357" alt="Screenshot 2024-07-28 at 12 29 10" src="https://github.com/user-attachments/assets/e4ab2722-cd91-4ece-ba86-1c30d7c52ccb">

### Patient Add
<img width="1357" alt="Screenshot 2024-07-28 at 12 29 24" src="https://github.com/user-attachments/assets/4b6feb27-c330-46e0-862d-e86ab786ef60">

### Scan Upload
<img width="1357" alt="Screenshot 2024-07-28 at 12 29 32" src="https://github.com/user-attachments/assets/17447686-f3e9-436c-83b0-134cbaf7c6bb">


## Getting Started

To get started with Sonomon, follow these steps:

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/sonomon.git
    ```

2. Navigate to the project directory:
    ```sh
    cd sonomon
    ```

### Backend Setup

1. Navigate to the server directory:
    ```sh
    cd server
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the server directory with the following content:
    ```env
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the client directory:
    ```sh
    cd client
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the client directory with the following content:
    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```

4. Start the frontend development server:
    ```sh
    npm run dev
    ```

### Running the Application

Once both the backend and frontend servers are running, you can access the frontend application in your browser at the URL provided by Vite, and the backend API will be accessible at `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
