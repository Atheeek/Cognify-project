pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'  // The NodeJS version configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Root Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('server') {
                    // Optional: Uncomment if you have tests
                    // bat 'npm test'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('server') {
                    // Optional: You can use pm2 or nodemon if needed
                    bat 'start "" cmd /c "npm start"'
                }
            }
        }

        stage('Start Frontend (Optional)') {
            steps {
                dir('client') {
                    bat 'start "" cmd /c "npm start"'
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
