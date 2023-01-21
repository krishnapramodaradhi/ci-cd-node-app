pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhubcredentials')
    }

    stages {
        stage('Git Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/krishnapramodaradhi/ci-cd-node-app']])
                echo 'Code Checkout complete'
            }
        }
        stage ('Build Docker Image') {
            steps {
                sh 'docker build -t krishnapramod/ci-cd-node-app --no-cache .'
            }
        }
        stage ('Push to Dockerhub') {
            steps {
                sh """
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker push krishnapramod/ci-cd-node-app
                """
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}