
# Ask-My-AI

Ask-My-AI is a Chrome extension that integrates AI-powered assistance directly into your browser. 
It allows users to select text on any webpage and receive concise answers using either Google Gemma or Perplexity AI. 
The extension features a custom context menu, user authentication, and is powered by Firebase Cloud Functions and MongoDB for seamless backend operations.

---

## Features

- **AI-Powered Responses**: Choose between Google Gemma and Perplexity AI to get succinct answers to your queries.
- **Custom Context Menu**: Right-click to access the "Ask My AI" option for instant assistance.
- **User Authentication**: Secure login and registration using bcrypt and cookie sessions.
- **Cross-Platform Backend**: Firebase Cloud Functions ensure the server is accessible from anywhere.
- **MongoDB Integration**: Stores user data and query history efficiently.

---

## Screenshots

### Login and Sign-In Page

![Login and Sign-In](https://github.com/user-attachments/assets/209cbef9-4f5b-4551-a4cb-9fa803fe3dc2)

### Ask Query Page

![Ask Query](https://github.com/user-attachments/assets/4a798b49-ce78-468c-a750-8f54b84ae3e2)

### Choose AI Option

![Choose AI](https://github.com/user-attachments/assets/f4deeefb-2d05-480a-8b93-be4af875dd39)

### Custom Context Menu

![Context Menu](https://github.com/user-attachments/assets/aa71c05b-2ae8-4411-97f5-b085cf55a34c)

---

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Chrome Extension)
- **Backend**: Node.js, Express.js, Firebase Cloud Functions
- **Database**: MongoDB
- **Authentication**: bcrypt, cookie-session
- **AI Integration**: Google Gemma, Perplexity AI

---

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running
- Firebase account

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ShobhitMaste/Ask-My-AI.git
   cd Ask-My-AI
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add:

   ```env
   API_KEY=your_perplexity_api_key
   API_GOOGLE=your_google_api_key
   MONGODB=your_mongodb_connection_string
   LOCALPORT=3000
   ```

4. **Run the Server**:

   ```bash
   npm start
   ```

### Chrome Extension Setup

1. **Load Extension**:

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click on "Load unpacked" and select the `Extension` folder from the cloned repository

2. **Use the Extension**:

   - Click on the extension icon to open the popup
   - Register or log in
   - Select text on any webpage, right-click, and choose "Ask My AI" to get a response

---

## Usage

- **Selecting AI Provider**:

  In the extension popup, navigate to settings and choose between "Google AI" and "Perplexity AI" as your preferred AI provider.

- **Asking Questions**:

  After logging in, select any text on a webpage, right-click, and choose "Ask My AI". 
  An alert will display the AI's response.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

