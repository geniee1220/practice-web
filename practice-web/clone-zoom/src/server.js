import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => {
  console.log("Listening on http://localhost:3000");
};

// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const handleConection = (socket) => {
  console.log(socket);
};

// callback 으로 socket 을 받아서 사용할 수 있다.
wss.on("connection", handleConection);

server.listen(3000, handleListen);
