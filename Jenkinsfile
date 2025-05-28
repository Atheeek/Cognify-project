pipeline {
    agent any

    environment {
        BACKEND_DIR = 'cognify-backend'
        FRONTEND_DIR = 'cognify-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            bat 'npm install'
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Setup Environment') {
            steps {
                dir("${BACKEND_DIR}") {
                    writeFile file: '.env', text: '''
MONGO_URI=mongodb://localhost:27017/complain
PORT=5000
'''
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Backend Build') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            // If using TypeScript or a build step
                            bat 'npm run build' // or skip if not needed
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            bat 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            bat 'npm test' // Optional if tests are defined
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            bat 'npm test' // Optional if tests are defined
                        }
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir("${FRONTEND_DIR}/dist") {
                    archiveArtifacts artifacts: '**/*', fingerprint: true
                }
            }
        }

        // Add your deploy stage here if needed
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'CI/CD pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
