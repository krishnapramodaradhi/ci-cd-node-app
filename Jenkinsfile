pipeline {
    agent any

    tools {
        nodejs 'node'
        dockerTool 'docker'
    }

    environment {
        dockerImage = 'krishnapramod/ci-cd-node-app'
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
                sh 'docker build -t $dockerImage --no-cache .'
            }
        }
        stage ('Push to Dockerhub') {
            steps {
                script {
                    echo 'Pushing to Dockerhub'
                    withCredentials([usernamePassword(credentialsId: 'dockerhubcredentials', passwordVariable: 'dhPwd', usernameVariable: 'dhUser')]) {
                        sh 'docker login -u ${dhUser} -p ${dhPwd}'
                    }
                    sh """
                        docker push ${dockerImage}
                    """
                }
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