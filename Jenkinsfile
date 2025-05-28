pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'  // The NodeJS version configured in Jenkins
    }

    environment {
        // Define environment variables here if needed
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {  // if your React app is inside a client folder
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('server') { // if your backend is inside a server folder
                    // For example, run tests or start server (you can customize)
                    sh 'npm install'
                    // sh 'npm test' // Optional if you have tests
                }
            }
        }

        // Add more stages if you want: test, deploy, etc.
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
