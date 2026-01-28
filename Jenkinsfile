pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE = 'devops-backend'
        FRONTEND_IMAGE = 'devops-frontend'
        VERSION = "${env.BUILD_NUMBER}"
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                echo 'Building Spring Boot Backend...'
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                echo 'Running Backend Tests...'
                dir('backend') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit 'backend/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building React Frontend...'
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                echo 'Running Frontend Tests...'
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Backend Image') {
                    steps {
                        echo 'Building Backend Docker Image...'
                        dir('backend') {
                            sh "docker build -t ${BACKEND_IMAGE}:${VERSION} ."
                            sh "docker tag ${BACKEND_IMAGE}:${VERSION} ${BACKEND_IMAGE}:latest"
                        }
                    }
                }
                stage('Frontend Image') {
                    steps {
                        echo 'Building Frontend Docker Image...'
                        dir('frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE}:${VERSION} ."
                            sh "docker tag ${FRONTEND_IMAGE}:${VERSION} ${FRONTEND_IMAGE}:latest"
                        }
                    }
                }
            }
        }
        
        stage('Push Docker Images') {
            when {
                branch 'main'
            }
            steps {
                echo 'Pushing Docker Images to Registry...'
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh "docker push ${BACKEND_IMAGE}:${VERSION}"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:${VERSION}"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to Kubernetes...'
                sh 'kubectl apply -f k8s/namespace.yaml'
                sh 'kubectl apply -f k8s/backend.yaml'
                sh 'kubectl apply -f k8s/frontend.yaml'
                sh 'kubectl apply -f k8s/ingress.yaml'
                
                echo 'Waiting for deployments to be ready...'
                sh 'kubectl rollout status deployment/backend -n devops-pipeline'
                sh 'kubectl rollout status deployment/frontend -n devops-pipeline'
            }
        }
        
        stage('Verify Deployment') {
            when {
                branch 'main'
            }
            steps {
                echo 'Verifying Deployment...'
                sh 'kubectl get pods -n devops-pipeline'
                sh 'kubectl get services -n devops-pipeline'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            slackSend(
                color: 'good',
                message: "Build ${env.BUILD_NUMBER} succeeded: ${env.JOB_NAME}"
            )
        }
        failure {
            echo 'Pipeline failed!'
            slackSend(
                color: 'danger',
                message: "Build ${env.BUILD_NUMBER} failed: ${env.JOB_NAME}"
            )
        }
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
    }
}
