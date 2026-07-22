# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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
