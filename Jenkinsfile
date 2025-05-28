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
                            // Start backend server in background and get PID immediately
                            bat '''
                            @echo off
                            start "backend" /B cmd /c "node server.js"
                            timeout /t 2 /nobreak > nul
                            for /f "tokens=2 delims=," %%a in ('wmic process where "CommandLine like '%node server.js%'" get ProcessId /format:csv ^| findstr /r /v "^$"') do (
                              echo %%a > backend.pid
                            )
                            '''
                        }
                    }
                }
                stage('Start Frontend Server') {
                    steps {
                        dir('cognify-frontend') {
                            // Start frontend server in background and get PID immediately
                            bat '''
                            @echo off
                            start "frontend" /B cmd /c "npm run dev"
                            timeout /t 2 /nobreak > nul
                            for /f "tokens=2 delims=," %%a in ('wmic process where "CommandLine like '%npm run dev%'" get ProcessId /format:csv ^| findstr /r /v "^$"') do (
                              echo %%a > frontend.pid
                            )
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
                            bat "taskkill /F /PID ${backendPid} || echo Backend process already stopped."
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
                            bat "taskkill /F /PID ${frontendPid} || echo Frontend process already stopped."
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
