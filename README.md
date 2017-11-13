# helloweb

local에서 다음과 같이 실행되는지 확인한다.

```
mvn package

java -jar target/dependency/webapp-runner.jar target/*.war

```
위와 같이 실행하고 http://localhost:8080/test 로 확인


## heroku 배포

```
git clone https://github.com/carami/helloweb.git
cd helloweb

heroku create
git push heroku master
```
