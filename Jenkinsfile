def dockerImage

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
                script {
                    dockerImage = docker.build('krishnapramod/ci-cd-node-app', '--no-cache .')
                }
            }
        }
        stage ('Push to Dockerhub') {
            steps {
                echo 'Pushing to Dockerhub'
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    dockerImage.push()
                }
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}