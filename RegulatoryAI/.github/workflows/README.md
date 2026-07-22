

## GitHub Actions Workflows

This repository includes separate workflows for building, scanning, and deploying the frontend and backend independently.

### 1. Backend image workflow

File: [.github/workflows/backend-docker.yml](.github/workflows/backend-docker.yml)

This workflow:
- runs on pushes and pull requests that change the backend code
- performs format and lint checks with Ruff
- runs a dependency security scan with Safety
- executes backend unit tests with coverage
- builds and scans the backend container image with Trivy
- pushes the image to GHCR on non-PR runs

### 2. Frontend image workflow

File: [.github/workflows/frontend-docker.yml](.github/workflows/frontend-docker.yml)

This workflow:
- runs on pushes and pull requests that change frontend assets or config
- installs dependencies and runs formatting/lint checks
- performs a frontend dependency security scan
- runs frontend tests with coverage
- builds and scans the frontend container image with Trivy
- pushes the image to GHCR on non-PR runs

### 3. Cloud Run deployment workflow

File: [.github/workflows/cloudrun-deploy.yml](.github/workflows/cloudrun-deploy.yml)

This workflow:
- builds the frontend image from [Dockerfile.frontend](Dockerfile.frontend)
- builds the backend image from [backend/Dockerfile](backend/Dockerfile)
- pushes both images to Artifact Registry
- deploys them to Google Cloud Run as the services `regulatoryai-frontend` and `regulatoryai-backend`

### 4. Frontend wiring workflow

File: [.github/workflows/cloudrun-wire-frontend.yml](.github/workflows/cloudrun-wire-frontend.yml)

This workflow:
- runs after the Cloud Run deployment workflow completes or can be triggered manually
- resolves the deployed backend URL
- updates the frontend Cloud Run service with the `REACT_APP_BACKEND_URL` environment variable so the UI connects to the deployed backend

### Required GitHub repository variables

Set these in the repository or organization settings under Secrets and variables > Actions > Variables:

- `GCP_PROJECT_ID`: your Google Cloud project ID
- `GCP_REGION`: your Cloud Run region, for example `us-central1`
- `GCP_WORKLOAD_IDENTITY_PROVIDER`: the Workload Identity Federation provider resource name
- `GCP_SERVICE_ACCOUNT`: the service account email used by GitHub Actions

### Optional GitHub repository variable

- `GCP_REGION` is also used by the deployment workflows as the default deployment region if not overridden.
