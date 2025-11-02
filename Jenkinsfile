pipeline {
    agent any

    tools {
        nodejs "NodeJS" 
    }

    environment {
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'edu-backend-branch-by-dip',
                    url: 'https://bitbucket.org/asterisks-edu-project/asterisks-edu-project.git',
                    credentialsId: 'cb2e0ae1-b216-475e-8d89-b7a6b00dcf72'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test' 
            }
        }

        stage('Start/Deploy') {
            steps {
                bat 'npm run start' 
            }
        }
    }

    post {
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
