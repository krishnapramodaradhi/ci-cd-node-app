def dockerImage

pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhubcredentials')
        dockerImage = 'krishnapramod/ci-cd-node-app'
    }

    stages {
        stage('Initialize') {
            def dockerHome = tool 'docker'
            env.PATH = '${dockerHome}/bin:${env.PATH}'
        }
        stage('Git Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/krishnapramodaradhi/ci-cd-node-app']])
                echo 'Code Checkout complete'
            }
        }
        stage ('Build Docker Image') {
            steps {
                sh 'docker build -t $dockerImage --no-cache .'
            }
        }
        stage ('Push to Dockerhub') {
            steps {
                echo 'Pushing to Dockerhub'
                sh """
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker push $dockerImage
                """
            }
        }
    }
    post {
        always {
            script {
                sh 'docker logout'
            }
        }
    }
}