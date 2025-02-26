# Assessment Backend

This project serves as the backend for the assessment application. It provides necessary APIs and functionalities to support the frontend interface.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

## Installation

### Environment Variables

Rename .env-copy to .env in both the frontend and backend folders. After starting the backend, copy and paste the backend URL into the frontend .env file.
In the backend .env file, make sure to add the MongoDB Atlas URL and set a secret key of your choice. For example: "TestKeyExample" (used for JWT authentication).



### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/vickynot-10/Assestment-Backend.git
   ```

2. **Navigate to the backend directory**:

   ```bash
   cd Backend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the backend server**:

   ```bash
   npm start
   ```

   The backend server should now be running.

### Frontend Setup

If you intend to use the frontend with this backend, follow these steps:

1. **Navigate to the frontend directory**:

   ```bash
   cd Frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend application**:

   ```bash
   npm run dev
   ```

   The frontend should now be running and connected to the backend.

## Usage

- **Backend**: Once running, the backend exposes various API endpoints. You can test these endpoints using tools like [Postman](https://www.postman.com/).
- **Frontend**: Access the frontend application in your browser to interact with the assessment features.

## Notes

- Ensure both backend and frontend are running concurrently to have a fully functional application.
- If you encounter issues with running `npm run dev` for the frontend, ensure that all dependencies are correctly installed. Refer to the [Vite documentation](https://vitejs.dev/) if you're using Vite as the build tool.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

