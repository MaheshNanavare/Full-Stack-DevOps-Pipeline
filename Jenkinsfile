pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE = 'devops-demo-backend'
        FRONTEND_IMAGE = 'devops-demo-frontend'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
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
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        dir('backend') {
                            sh """
                                docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} .
                                docker tag ${BACKEND_IMAGE}:${IMAGE_TAG} ${BACKEND_IMAGE}:latest
                            """
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        dir('frontend') {
                            sh """
                                docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} .
                                docker tag ${FRONTEND_IMAGE}:${IMAGE_TAG} ${FRONTEND_IMAGE}:latest
                            """
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
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-credentials') {
                        sh """
                            docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                            docker push ${BACKEND_IMAGE}:latest
                            docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                            docker push ${FRONTEND_IMAGE}:latest
                        """
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh """
                        kubectl set image deployment/backend-deployment backend=${BACKEND_IMAGE}:${IMAGE_TAG} -n devops-demo
                        kubectl set image deployment/frontend-deployment frontend=${FRONTEND_IMAGE}:${IMAGE_TAG} -n devops-demo
                        kubectl rollout status deployment/backend-deployment -n devops-demo
                        kubectl rollout status deployment/frontend-deployment -n devops-demo
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
