# 3D Celestial Model Viewer Frontend

This repository contains the frontend for the **3D Celestial Model Viewer**. The application allows users to explore 3D models of celestial bodies, view detailed information, and control the projection using WebSockets and voice commands.

## Features

- **Interactive 3D Models**: The application uses **Three.js** for rendering 3D models of celestial bodies such as planets and moons. Models can be viewed and rotated in real time.
- **Voice-Controlled Interaction**: Through integration with a backend service, users can control which celestial body to display and retrieve information via voice commands.
- **Next.js and React**: The app is built using **Next.js** and **React**, allowing for a smooth user experience and server-side rendering capabilities.
- **Real-time Communication**: WebSockets are used to provide real-time interaction with the backend, allowing seamless control and updates to the displayed celestial bodies.
- **Tailwind CSS**: Responsive and modern UI built with **Tailwind CSS**.

## Backend

The backend for this project is hosted in a separate repository. It handles voice recognition and processing using the following technologies:

- **Python** and **Flask**: For the server-side logic and WebSocket communication.
- **Whisper**: OpenAI's automatic speech recognition (ASR) model, which listens to and processes voice commands.
- **OpenAI**: Used for additional language processing and generating responses based on user queries.

For the backend code and more details, please refer to the [Backend Repository](https://github.com/ruyca/nova_backend).

## Tech Stack

### Frontend:
- **Three.js**: For 3D model rendering and scene interaction.
- **Next.js**: Server-side rendering and React framework.
- **Tailwind CSS**: Utility-first CSS framework for designing the UI.
- **WebSockets**: For real-time communication with the backend.

### Backend:
- **Python**: For handling the server logic.
- **Flask**: Lightweight web framework for the API and WebSocket connections.
- **Whisper**: Voice recognition for understanding user commands.
- **OpenAI API**: For advanced natural language processing.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AlexGrim12/Nova-frontend
   ```

2. Install dependencies:

   ```bash
   cd 3D-celestial-viewer-frontend
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be running on `http://localhost:3000`.

Make sure the backend server is running to enable voice interaction and WebSocket features.