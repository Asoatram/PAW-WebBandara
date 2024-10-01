# PAW-WebBandara ✈️

| Nama Anggota                               | NIM                |
|--------------------------------------------|--------------------|
| Sean Titan Yang                            | 22/492933/TK/53965 |
| Salwa Nayla Adistri                        | 22/493200/TK/54017 |
| Muhammad Fajrulfalaq Izzulfirdausyah Suryaprabandaru | 22/494174/TK/54184 |
| Luthfi Hanif                               | 22/497890/TK/54589 |
| Muhamad Daffa Azfa Rabbani                 | 22/503970/TK/55101 |


WebApp Setup Guide
Overview
This is a WebBandara. It is built using MongoDB for the database and Express.js for the backend. This guide will walk you through setting up the project on your local machine.

Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js (v14 or later): You can install Node.js from [here.](https://nodejs.org/)

MongoDB: Make sure you have MongoDB installed and running locally or have access to a remote MongoDB instance.

Git: You will need Git for cloning the repository. Install Git from [here.](https://git-scm.com/downloads)

Setup Instructions
## 1. Clone the repository
First, clone the project repository to your local machine. Run the following command in your terminal:

```bash
cd repository-name
git clone https://github.com/Asoatram/PAW-WebBandara
```


## 2. Install dependencies
After cloning the repository, you need to install the project dependencies. Run the following command:

```bash
npm install
```
## 3. Set up the environment variables
Create a .env file in the root directory of the project and add the necessary environment variables. Here's an example of what your .env file should contain:

```bash
MONGO_URI=mongodb+srv://User:GIjJ7tZFQLtikJ8K@cluster0.px122pi.mongodb.net/WebBandara
```
## 4. Start the application
After setting up the environment variables, you can start the server by running:

```bash
npm start
```

## 5. Access the application
Once the server is running, you can access the web application by visiting http://localhost:3001 (or the port you configured) in your browser.
```bash
Folder Structure
.
├── node_modules/
├── public/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── .gitignore
├── package.json
└── README.md
```
src/controllers/: Contains the application logic and controllers.

src/models/: Contains the database models.

src/routes/: Defines the application routes.

src/utils/: Utility functions.

Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

___
License

This project is licensed under the MIT License.

