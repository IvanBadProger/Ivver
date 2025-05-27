### Инструкция по запуску проекта

- Клонирование репозитория: `git clone https://github.com/IvanBadProger/Ivver.git`
- Установка зависимостей проекта: `npm install`
- Запуск проекта:
  - `npm run dev` - в дев режиме
  - `npm run build`, затем `npm run start` - в прод режиме

Пример .env файла:

```
API_URL_DEFAULT="http://127.0.0.1:8000/api/"
API_URL_ADMIN="http://127.0.0.1:8000/api/admin/"
```

Проект без работающей API работает через жопу и не выдает `failed to fetch` ошибки
