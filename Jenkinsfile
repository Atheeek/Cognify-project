pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Backend Dependencies') {
                    steps {
                        dir('cognify-backend') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Install Frontend Dependencies') {
                    steps {
                        dir('cognify-frontend') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Setup Backend Environment') {
            steps {
                dir('cognify-backend') {
                    // Create .env file with MongoDB URI and PORT
                    writeFile file: '.env', text: '''
MONGO_URI=mongodb://localhost:27017/complain
PORT=5000
'''
                }
            }
        }

        stage('Start Servers') {
            parallel {
                stage('Start Backend Server') {
                    steps {
                        dir('cognify-backend') {
                            // Run backend server - Windows doesn't support '&', so use start /B to run in background
                            bat 'start /B node server.js'
                        }
                    }
                }
                stage('Start Frontend Server') {
                    steps {
                        dir('cognify-frontend') {
                            bat 'start /B npm run dev'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
