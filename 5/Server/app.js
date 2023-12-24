import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";
import logger from "morgan";
import router from "./router/index.js";
import { mongooseConnect } from "./model/connections.js";
import { config } from "dotenv";
import { createServer } from "http";
import { socketServer } from "./socket.js";

config();
const __filename = fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
socketServer.init(server);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", router);

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is run");
  mongooseConnect(process.env.DB_URL);
});
