pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh '''echo "hello world!"
node -v
npm install
npm run build'''
      }
    }

  }
}