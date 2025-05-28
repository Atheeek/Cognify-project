pipeline {
    agent any

    stages {
        stage('Debug Workspace') {
            steps {
                bat 'dir /b /s'
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

        stage('Start Servers in Parallel') {
            parallel {
                stage('Start Backend Server') {
                    steps {
                        dir('cognify-backend') {
                            bat 'node server.js'
                        }
                    }
                }
                stage('Start Frontend Server') {
                    steps {
                        dir('cognify-frontend') {
                            bat 'npm run dev'
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
