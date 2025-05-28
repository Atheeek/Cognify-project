pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'  // Change this to your Jenkins NodeJS installation name
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Server Dependencies') {
                    steps {
                        dir('server') {
                            bat 'npm install'
                        }
                    }
                }
                stage('Install Client Dependencies') {
                    steps {
                        dir('client') {
                            bat 'npm install'
                        }
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    // Vite build for production
                    bat 'npm run build'
                }
            }
        }

        stage('Start Servers in Parallel') {
            parallel {
                stage('Start Backend Server') {
                    steps {
                        dir('server') {
                            // Use start /b for background process on Windows
                            bat 'start /b npm start'
                        }
                    }
                }

                stage('Start Frontend Server (Optional)') {
                    steps {
                        dir('client') {
                            // Uncomment if you want to run dev server (not recommended in Jenkins)
                            // bat 'start /b npm run dev'
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
