const http = require("http");
require("dotenv").config();

const PORT = process.env.PORT;
const intervalTime = process.env.intervalTime;
const serverStop = process.env.serverStop;
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const dateInterval = setInterval(() => {
      console.log(`Текущее время: ${new Date().toUTCString()}`);
    }, intervalTime);
    setTimeout(() => {
      clearInterval(dateInterval);
      const lastTime = new Date().toUTCString();
      res.writeHead(200, { "Content-Type": "text/plain", charset: "utf-8" });
      res.end(`${lastTime}`);
    }, serverStop);
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
