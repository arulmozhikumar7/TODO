```markdown
# To-Do App

This is a simple To-Do app with a frontend built with React and a backend built with Node.js and Express.

## Frontend Setup

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:
```

git clone https://github.com/arulmozhikumar7/TODO.git

```

2. Navigate to the frontend directory:

```

cd client

```

3. Create a `.env` file in the frontend directory and add the following environment variable:

```

VITE_API_URL= http://localhost:5000/api/tasks

```


4. Install dependencies:

```

npm install

```

### Running the Development Server

```

npm run dev

```

The frontend server should now be running on `http://localhost:5173`.

## Backend Setup

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running on your system

### Installation

1. Navigate to the backend directory:

```

cd serve

```

2. Create a `.env` file in the backend directory and add the following environment variables:

```

PORT=5000
MONGO_URI=<your-mongodb-uri>

```

Replace  `<your-mongodb-uri>` with the URI of your MongoDB database.

3. Install dependencies:

```

npm install

```

### Running the Backend Server

```

node index.js

```

The backend server should now be running.

## Usage

Once both the frontend and backend servers are running, you can access the To-Do app by navigating to `http://localhost:5173` in your web browser.

```
