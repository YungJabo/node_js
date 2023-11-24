const http = require("http");

const PORT = 5000;
const intervalTime = 2000;
const serverStop = 9500;
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const dateInterval = setInterval(() => {
      console.log(`Текущее время: ${new Date().toUTCString()}`);
    }, intervalTime);
    setTimeout(() => {
      clearInterval(dateInterval);
      const lastTime = new Date().toUTCString();
      console.log(`Сервер был остановлен в: ${lastTime}`);
    }, serverStop);
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
