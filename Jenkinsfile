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
                sh 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('server') {
                    // Optional: Uncomment if you have tests
                    // sh 'npm test'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('server') {
                    // Optional: You can use pm2 or nodemon if needed
                    sh 'npm start &'
                }
            }
        }

        stage('Start Frontend (Optional)') {
            steps {
                dir('client') {
                    sh 'npm start &'
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
