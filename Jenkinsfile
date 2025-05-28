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

        stage('Stop Servers') {
            steps {
                echo 'Stopping backend and frontend servers...'
                // Kill node and npm processes forcibly to release workspace files
                bat '''
                taskkill /F /IM node.exe || echo "No node.exe processes found"
                taskkill /F /IM npm.exe || echo "No npm.exe processes found"
                '''
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
