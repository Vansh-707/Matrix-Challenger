# Comment Application

This is a backend-focused full-stack comment application built with NestJS. The application is designed to manage comments and users efficiently, adhering to clean architecture principles and optimized for performance.

## Features

- User authentication and management
- Comment creation, retrieval, editing, deletion, and restoration
- Exception handling and logging
- Data validation using DTOs

## Technologies Used

- NestJS
- TypeScript
- PostgreSQL (for database)
- Docker (for containerization)

## Project Structure

```
comment-app
├── src
│   ├── app.module.ts
│   ├── main.ts
│   ├── comments
│   │   ├── comments.controller.ts
│   │   ├── comments.service.ts
│   │   ├── comments.module.ts
│   │   └── dto
│   │       └── create-comment.dto.ts
│   ├── users
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto
│   │       └── create-user.dto.ts
│   ├── common
│   │   ├── filters
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors
│   │   │   └── logging.interceptor.ts
│   │   └── pipes
│   │       └── validation.pipe.ts
│   └── config
│       ├── app.config.ts
│       └── database.config.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── docker
│   ├── Dockerfile
│   └── docker-compose.yml
├── .dockerignore
├── .env
├── .gitignore
├── package.json
├── tsconfig.build.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- Docker
- PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd comment-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables in the `.env` file.

### Running the Application

To run the application locally, use the following command:
```
npm run start:dev
```

### Running with Docker

To build and run the application using Docker, execute:
```
docker-compose up --build
```

### Testing

To run the end-to-end tests, use:
```
npm run test:e2e
```

## License

This project is licensed under the MIT License.