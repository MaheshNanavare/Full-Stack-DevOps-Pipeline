# Full-Stack DevOps Pipeline

A complete CI/CD pipeline demonstration for a full-stack application using modern DevOps tools and practices.

## 🚀 Tech Stack

- **Frontend**: React 18 (JavaScript)
- **Backend**: Spring Boot 3.1 (Java 17)
- **Containerization**: Docker & Docker Compose
- **CI/CD**: Jenkins
- **Orchestration**: Kubernetes (Minikube)

## 📋 Prerequisites

- Java 17+
- Node.js 18+
- Maven 3.6+
- Docker & Docker Compose
- Kubernetes (Minikube recommended)
- kubectl CLI
- Jenkins (optional for CI/CD)

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │
│  React Frontend │─────▶│ Spring Boot API │
│    (Port 80)    │      │   (Port 8080)   │
│                 │      │                 │
└─────────────────┘      └─────────────────┘
         │                        │
         └────────────┬───────────┘
                      │
              ┌───────▼────────┐
              │                │
              │  Docker/K8s    │
              │  Orchestration │
              │                │
              └────────────────┘
```

## 🚀 Quick Start

### 1. Using Docker Compose (Recommended for Local Development)

```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:8080/api/health
```

### 2. Running Services Individually

#### Backend (Spring Boot)

```bash
cd backend
mvn clean package
java -jar target/backend-1.0.0.jar

# Or with Maven
mvn spring-boot:run
```

#### Frontend (React)

```bash
cd frontend
npm install
npm start

# Build for production
npm run build
```

### 3. Kubernetes Deployment (Minikube)

```bash
# Start Minikube
minikube start

# Build Docker images (for Minikube)
eval $(minikube docker-env)
docker build -t devops-backend:latest ./backend
docker build -t devops-frontend:latest ./frontend

# Deploy to Kubernetes
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml

# Check deployment status
kubectl get pods -n devops-pipeline
kubectl get services -n devops-pipeline

# Access the application
minikube service frontend -n devops-pipeline
```

## 🔧 Jenkins CI/CD Setup

### Configure Jenkins

1. Install Jenkins and required plugins:
   - Docker Pipeline
   - Kubernetes CLI
   - Git
   - Maven Integration

2. Configure credentials:
   - Docker Hub credentials (ID: `docker-hub-credentials`)
   - Kubeconfig file (ID: `kubeconfig`)

3. Create a new Pipeline job:
   - Point to your repository
   - Use `Jenkinsfile` from the repository

### Pipeline Stages

The Jenkins pipeline includes:

1. **Checkout**: Clone the repository
2. **Build Backend**: Compile Spring Boot application
3. **Test Backend**: Run unit tests
4. **Build Frontend**: Build React application
5. **Test Frontend**: Run frontend tests
6. **Build Docker Images**: Create container images
7. **Push Docker Images**: Push to registry (main branch only)
8. **Deploy to Kubernetes**: Apply K8s manifests (main branch only)
9. **Verify Deployment**: Check deployment status

## 📁 Project Structure

```
.
├── backend/                  # Spring Boot backend
│   ├── src/
│   │   ├── main/java/        # Java source code
│   │   └── main/resources/   # Application properties
│   ├── Dockerfile            # Backend container image
│   └── pom.xml               # Maven dependencies
│
├── frontend/                 # React frontend
│   ├── public/               # Static assets
│   ├── src/                  # React components
│   ├── Dockerfile            # Frontend container image
│   ├── nginx.conf            # Nginx configuration
│   └── package.json          # NPM dependencies
│
├── k8s/                      # Kubernetes manifests
│   ├── namespace.yaml        # K8s namespace
│   ├── backend.yaml          # Backend deployment & service
│   ├── frontend.yaml         # Frontend deployment & service
│   └── ingress.yaml          # Ingress configuration
│
├── docker-compose.yml        # Docker Compose configuration
├── Jenkinsfile              # Jenkins CI/CD pipeline
└── README.md                # This file
```

## 🔍 API Endpoints

### Backend Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/info` - Application information

### Testing Endpoints

```bash
# Health check
curl http://localhost:8080/api/health

# Application info
curl http://localhost:8080/api/info
```

## 🐳 Docker Commands

```bash
# Build images
docker build -t devops-backend:latest ./backend
docker build -t devops-frontend:latest ./frontend

# Run containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v
```

## ☸️ Kubernetes Commands

```bash
# Apply all manifests
kubectl apply -f k8s/

# View resources
kubectl get all -n devops-pipeline

# View logs
kubectl logs -f deployment/backend -n devops-pipeline
kubectl logs -f deployment/frontend -n devops-pipeline

# Scale deployments
kubectl scale deployment backend --replicas=3 -n devops-pipeline

# Delete resources
kubectl delete -f k8s/
```

## 🔄 Development Workflow

1. **Local Development**:
   - Run backend and frontend separately
   - Make code changes
   - Test locally

2. **Container Testing**:
   - Build Docker images
   - Test with Docker Compose
   - Verify inter-service communication

3. **Kubernetes Deployment**:
   - Deploy to Minikube
   - Test in K8s environment
   - Verify scaling and health checks

4. **CI/CD**:
   - Push changes to Git
   - Jenkins automatically builds and tests
   - Deploys to Kubernetes on main branch

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

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Stop existing containers
   docker-compose down
   ```

2. **Minikube Image Pull Issues**:
   ```bash
   # Use Minikube's Docker daemon
   eval $(minikube docker-env)
   # Rebuild images
   ```

3. **Kubernetes Deployment Not Ready**:
   ```bash
   # Check pod logs
   kubectl logs <pod-name> -n devops-pipeline
   # Describe pod for events
   kubectl describe pod <pod-name> -n devops-pipeline
   ```

## 📚 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Mahesh Nanavare

## 🎯 Future Enhancements

- [ ] Add database integration (PostgreSQL/MongoDB)
- [ ] Implement authentication and authorization
- [ ] Add monitoring with Prometheus and Grafana
- [ ] Implement logging with ELK stack
- [ ] Add Helm charts for easier K8s deployment
- [ ] Implement GitOps with ArgoCD
- [ ] Add automated security scanning
- [ ] Implement blue-green deployments
