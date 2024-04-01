# Overview

This project is a microservices-based system designed to handle cryptocurrency token pair management and user authentication, providing an interface for signing up, signing in, and managing token pairs, including fetching aggregated prices. The system is structured into two main microservices:

- **Auth Service:** Handles user authentication, allowing users to sign up, sign in, and obtain a JWT token for authenticated requests.
- **Price Oracle Service:** Manages cryptocurrency token pairs, enabling authorized users to add, update, view, and delete token pairs, as well as fetch aggregated prices.

Both microservices are containerized using **Docker and orchestrated with Kubernetes**, making the system scalable and resilient. The deployment process utilizes [**Skaffold**](https://skaffold.dev/), simplifying the development, testing, and deployment workflow on Kubernetes.

## Requirements

- Docker and Kubernetes for containerization and orchestration.
- Skaffold for streamlined deployments to Kubernetes ([**Install Skaffold**](https://skaffold.dev/docs/install/#standalone-binary)).
- Any external APIs for fetching token prices are just examples and are not implemented as working solutions in this project.

## Microservices

### Auth Service Routes

- Sign Up: POST /api/users/signup
  - Registers a new user and returns a JWT token.
- Current User: GET /api/users/currentuser
  - Retrieves the current authenticated user's information.
- Sign In: POST /api/users/signin
  - Authenticates a user and returns a JWT token.

### Price Oracle Service Routes

- Add Token Pair: POST /api/prices/token-pairs
  - Adds a new token pair. Requires authentication.
- Update Token Pair: PUT /api/prices/token-pairs/:symbol
  - Updates an existing token pair by its symbol. Requires authentication.
- Get All Token Pairs: GET /api/prices/token-pairs
  - Retrieves all token pairs. Requires authentication.
- Delete Token Pair: DELETE /api/prices/token-pairs/:symbol
  - Deletes a token pair by its symbol. Requires authentication.
- Get Aggregated Price: GET /api/prices/symbol
  - Fetches the aggregated price for a token pair. Requires authentication.
- Save Price: POST /api/prices/
  - Saves the price for a token pair. Requires authentication.

## Getting Started

### Prerequisites

- Ensure Docker, Kubernetes, and Skaffold are installed on your system.
- Configure Kubernetes secrets for storing environment variables.

### Deployment

- Clone the repository: `git clone <repository-url>`
- Navigate to the project directory: `cd <project-directory>`
- Deploy using Skaffold: `skaffold dev` or `skaffold run`

## Note

The functionality related to fetching data from external sources for token prices in the Price Oracle Service is illustrative and requires integration with actual data providers. The provided routes and methods serve as a foundation, which should be extended to include real data fetching logic as per your project's requirements.
