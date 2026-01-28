# Full-Stack DevOps Pipeline

This project demonstrates a complete CI/CD pipeline for a full-stack application using:
- **React** (JavaScript) for the frontend
- **Spring Boot** (Java) for the backend
- **Docker** for containerization
- **Jenkins** for automated CI/CD
- **Kubernetes** for deployment and orchestration

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│  Database   │
│   (React)   │      │(Spring Boot)│      │  (Optional) │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │
       └────────────────────┘
                │
         ┌──────▼──────┐
         │   Docker    │
         └──────┬──────┘
                │
         ┌──────▼──────┐
         │  Kubernetes │
         └─────────────┘
```

## 📁 Project Structure

```
.
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/java/
│   │   └── test/java/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/               # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── kubernetes/             # Kubernetes manifests
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── ingress.yaml
├── docker-compose.yml      # Local development setup
└── Jenkinsfile            # CI/CD pipeline definition
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Java 17 (for local backend development)
- Node.js 18+ (for local frontend development)
- kubectl (for Kubernetes deployment)
- Jenkins (for CI/CD)

### Local Development with Docker Compose

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaheshNanavare/Full-Stack-DevOps-Pipeline.git
   cd Full-Stack-DevOps-Pipeline
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api/health

### Local Development (Without Docker)

#### Backend
```bash
cd backend
mvn spring-boot:run
```
The backend will be available at http://localhost:8080

#### Frontend
```bash
cd frontend
npm install
npm start
```
The frontend will be available at http://localhost:3000

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🐳 Docker

### Build Individual Images

**Backend:**
```bash
cd backend
docker build -t devops-demo-backend:latest .
```

**Frontend:**
```bash
cd frontend
docker build -t devops-demo-frontend:latest .
```

### Run Individual Containers

**Backend:**
```bash
docker run -p 8080:8080 devops-demo-backend:latest
```

**Frontend:**
```bash
docker run -p 3000:80 devops-demo-frontend:latest
```

## ☸️ Kubernetes Deployment

### Deploy to Kubernetes

1. **Create namespace:**
   ```bash
   kubectl apply -f kubernetes/namespace.yaml
   ```

2. **Deploy backend:**
   ```bash
   kubectl apply -f kubernetes/backend-deployment.yaml
   ```

3. **Deploy frontend:**
   ```bash
   kubectl apply -f kubernetes/frontend-deployment.yaml
   ```

4. **Setup ingress (optional):**
   ```bash
   kubectl apply -f kubernetes/ingress.yaml
   ```

### Verify Deployment

```bash
kubectl get pods -n devops-demo
kubectl get services -n devops-demo
kubectl get deployments -n devops-demo
```

### Access the Application

```bash
# Get the frontend service URL
kubectl get service frontend-service -n devops-demo
```

For LoadBalancer, use the external IP. For NodePort, use `<node-ip>:<node-port>`.

## 🔄 CI/CD Pipeline (Jenkins)

### Pipeline Stages

1. **Checkout** - Clone the repository
2. **Build Backend** - Compile Spring Boot application
3. **Test Backend** - Run unit tests
4. **Build Frontend** - Build React application
5. **Test Frontend** - Run frontend tests
6. **Build Docker Images** - Create Docker images for both services
7. **Push Docker Images** - Push to Docker registry (on main branch)
8. **Deploy to Kubernetes** - Update Kubernetes deployments (on main branch)

### Setup Jenkins

1. **Install required plugins:**
   - Docker Pipeline
   - Kubernetes CLI
   - Git

2. **Configure credentials:**
   - Docker registry credentials (ID: `docker-credentials`)
   - Kubernetes config

3. **Create Pipeline Job:**
   - New Item → Pipeline
   - Pipeline script from SCM
   - Repository URL: Your repo URL
   - Script Path: `Jenkinsfile`

## 🔧 Configuration

### Environment Variables

**Backend** (application.properties):
- `server.port`: Server port (default: 8080)
- `spring.application.name`: Application name

**Frontend**:
- `REACT_APP_BACKEND_URL`: Backend API URL (default: http://localhost:8080)

### Kubernetes Configuration

Update the following in Kubernetes manifests as needed:
- Image names and tags
- Resource limits
- Replica counts
- Service types
- Ingress hosts

## 📊 API Endpoints

### Backend Endpoints

- `GET /api/health` - Health check
- `GET /api/message` - Get welcome message
- `GET /actuator/health` - Spring Actuator health endpoint

## 🛠️ Technology Stack

### Frontend
- React 18
- CSS3
- Fetch API

### Backend
- Spring Boot 3.2.0
- Spring Web
- Spring Actuator
- Java 17
- Maven

### DevOps
- Docker & Docker Compose
- Jenkins
- Kubernetes
- Nginx (as reverse proxy)

## 📝 Best Practices Implemented

✅ Multi-stage Docker builds for optimized images  
✅ Health checks and readiness probes  
✅ Resource limits in Kubernetes  
✅ Parallel builds in Jenkins pipeline  
✅ Automated testing in CI/CD  
✅ GitOps-ready Kubernetes manifests  
✅ Environment-based configuration  
✅ Proper logging and monitoring endpoints

## 🐛 Troubleshooting

### Backend not starting
- Check Java version (requires Java 17)
- Verify port 8080 is not in use
- Check logs: `docker logs devops-backend`

### Frontend not connecting to backend
- Verify `REACT_APP_BACKEND_URL` is set correctly
- Check CORS configuration in backend
- Ensure backend is running and accessible

### Kubernetes deployment issues
- Check pod status: `kubectl get pods -n devops-demo`
- View logs: `kubectl logs <pod-name> -n devops-demo`
- Describe pod: `kubectl describe pod <pod-name> -n devops-demo`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mahesh Nanavare**

## 🙏 Acknowledgments

- Spring Boot Team
- React Team
- Docker & Kubernetes Communities
- Jenkins Community
