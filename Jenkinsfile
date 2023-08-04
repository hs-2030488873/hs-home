pipeline {
    agent docker {
      image "node:16"
      args "-p 20000:8080"
    }  	

    stages {
        stage(Hello) {
            steps {
                sh 'echo Hello World'
            }
        }
        
        stage(Build) {
            steps {
                sh 'echo 构建开始'
                sh 'node -v'
                sh 'npm install' 
                sh 'npm run build'
                sh 'echo 构建完成'
            }
        }
    }
}
