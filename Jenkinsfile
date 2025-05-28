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
                            // Start backend, save PID in a file
                            bat '''
                            start /B node server.js
                            for /f "tokens=2" %%a in ('tasklist /fi "imagename eq node.exe" /fo csv /nh') do echo %%a > backend.pid
                            '''
                        }
                    }
                }
                stage('Start Frontend Server') {
                    steps {
                        dir('cognify-frontend') {
                            // Start frontend, save PID in a file
                            bat '''
                            start /B npm run dev
                            for /f "tokens=2" %%a in ('tasklist /fi "imagename eq node.exe" /fo csv /nh') do echo %%a > frontend.pid
                            '''
                        }
                    }
                }
            }
        }

        stage('Stop Servers') {
            steps {
                dir('cognify-backend') {
                    script {
                        if (fileExists('backend.pid')) {
                            def backendPid = readFile('backend.pid').trim()
                            echo "Stopping backend PID: ${backendPid}"
                            bat "taskkill /F /PID ${backendPid}"
                        } else {
                            echo "No backend.pid file found."
                        }
                    }
                }
                dir('cognify-frontend') {
                    script {
                        if (fileExists('frontend.pid')) {
                            def frontendPid = readFile('frontend.pid').trim()
                            echo "Stopping frontend PID: ${frontendPid}"
                            bat "taskkill /F /PID ${frontendPid}"
                        } else {
                            echo "No frontend.pid file found."
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
