# trucks-frontend

## Project setup

### Собираем образ контейнера
```shell
docker build -t frontend-trucks:dev .
```

### Создаем контейнер
```shell
docker run -p 8083:8080 --name frontend-trucks-container -d frontend-trucks:dev
```
