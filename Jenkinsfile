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
                            // If backend has a build script (like TypeScript compilation)
                            bat 'if exist package.json (npm run build) else (echo No build step for backend)'
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            bat 'if exist package.json (npm run build) else (echo No package.json found)'
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
                            bat 'if exist package.json (npm test) else (echo No backend tests defined)'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            bat 'if exist package.json (npm test) else (echo No frontend tests defined)'
                        }
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                dir("${FRONTEND_DIR}\\dist") {
                    archiveArtifacts artifacts: '**/*', fingerprint: true
                }
            }
        }

        // Uncomment and add deploy logic if needed
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploy logic goes here'
        //     }
        // }
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
