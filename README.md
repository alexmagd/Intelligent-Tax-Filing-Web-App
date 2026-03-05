# Intelligent Tax Filing Web Application

This project is a full-stack web application designed to assist users with basic tax calculations and provide AI-generated tax advice.

Users can input financial information such as income and expenses, and the application will:

- Calculate estimated taxable income
- Estimate tax liability
- Generate intelligent tax advice using a Generative AI model

The application demonstrates full-stack development, AI integration, containerization, and DevOps practices.

## Features

- Responsive React frontend
- FastAPI backend with RESTful endpoints
- AI-powered tax advice using OpenAI
- Docker containerization for frontend and backend
- Environment variable management
- Modular component architecture

## Architecture

The application follows a client–server architecture.

User → React Frontend → FastAPI Backend → OpenAI API → Response → Frontend Display

Browser
↓
React Frontend (Port 5173)
↓
FastAPI Backend (Port 8000)
↓
OpenAI API

## Tech Stack

Frontend

- React (Vite)
- JavaScript
- CSS

Backend

- FastAPI
- Python

AI Integration

- OpenAI API

Infrastructure

- Docker
- Docker Compose

Version Control

- Git
- GitHub

## Project Structure

Intelligent-Tax-Filing-Web-App
│
├── frontend/ # React application
│
├── backend/ # FastAPI backend
│
├── docker/ # Docker configuration
│ ├── backend.Dockerfile
│ ├── frontend.Dockerfile
│ └── docker-compose.yml
│
└── README.md

## Running with Docker

The entire application can be started using Docker Compose.

docker compose -f docker/docker-compose.yml up --build

Frontend:
http://127.0.0.1:5173

Backend:
http://127.0.0.1:8000/docs

## Running Locally

### Backend

cd backend

Install dependencies:

uv sync

Run server:

uvicorn main:app --reload

Backend will run on:
http://127.0.0.1:8000

### Frontend

cd frontend

npm install
npm run dev

Frontend will run on:
http://127.0.0.1:5173

## AI Integration

The backend integrates the OpenAI API to generate tax advice based on user financial inputs.

The workflow is:

1. User submits income and expenses
2. Backend constructs a prompt
3. Prompt is sent to OpenAI
4. AI returns structured advice
5. Response is displayed in the frontend

The integration uses the OpenAI Python SDK and environment variables for secure API key management.
