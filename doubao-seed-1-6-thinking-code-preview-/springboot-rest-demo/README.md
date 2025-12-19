# Spring Boot RESTful API Demo

A minimal Spring Boot application demonstrating a simple RESTful endpoint.

## Option 1: Run with Docker (No Dependencies Required)
1. **Install Docker:** Download from https://www.docker.com/get-started
2. **Build and run:**
   ```bash
   docker-compose up --build
   ```
3. **Test the API:** http://localhost:8080/hello

## Option 2: Run Locally (Requires Java & Maven)
### Prerequisites
- Java 17 or higher: https://adoptium.net/temurin/releases/
- Maven 3.6 or higher: https://maven.apache.org/download.cgi

### How to Run
1. **Build and run the application:**
   ```bash
   mvn spring-boot:run
   ```
2. **Test the API:** http://localhost:8080/hello

## Expected Response
You should see: `Hello, Spring Boot REST!`

## Project Structure
```
springboot-rest-demo/
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose file
├── pom.xml                 # Maven configuration
├── README.md               # This file
└── src/
    └── main/
        └── java/
            └── com/
                └── example/
                    └── demo/
                        ├── DemoApplication.java  # Main app class
                        └── HelloController.java   # REST controller
```
