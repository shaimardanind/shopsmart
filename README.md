# 🛒 ShopSmart

**ShopSmart** — это простое приложение для совместного списка покупок с возможностью добавления товаров вручную и через AI-помощника.

## 🚀 Возможности

- Создание уникального списка покупок по UUID
- Добавление и удаление товаров
- Отметка «куплено»
- Подключение в реальном времени (через WebSocket)
- Генерация списка по текстовому запросу с помощью OpenAI GPT

## 🛠 Установка и запуск

1. Клонируйте репозиторий или распакуйте архив:

```bash
git clone https://github.com/yourusername/shopsmart.git
cd shopsmart/server
Установите зависимости:

2. bash
npm install
Создайте файл .env и добавьте ключ OpenAI:

3.env
OPENAI_API_KEY=your_openai_key
Запустите сервер:

4.bash
npm start
📬 Примеры запросов
Создать или добавить товар:


POST http://localhost:4000/api/{uuid}
Content-Type: application/json

{
  "item": "Хлеб"
}
Получить список:


GET http://localhost:4000/api/{uuid}
Переключить статус покупки:


POST http://localhost:4000/toggle/{uuid}
Content-Type: application/json

{
  "index": 0
}
Создать список через AI:


POST http://localhost:4000/ai/{uuid}
Content-Type: application/json

{
  "prompt": "Что купить для борща?"
}
💡 Примечания
Сервер запускается на порту 4000

Поддержка WebSocket подключается через событие join и update

UUID можно сгенерировать вручную через uuidv4()