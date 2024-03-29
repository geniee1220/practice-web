import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
// import WebSocket from "ws";

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => {
  console.log('Listening on http://localhost:5050');
};

// app.listen(3000, handleListen);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

wsServer.on('connection', (socket) => {
  // 프론트엔드에서 join_name 이벤트를 받으면 roomname 을 인자로 socket.join을 실행
  // socket.join 은 socket.io 에서 제공하는 메소드로, roomname 이라는 이름의 방에 접속하게 해준다.
  socket.on('join_room', (roomname) => {
    socket.join(roomname);
    socket.to(roomname).emit('welcome');
  });

  socket.on('offer', (offer, roomname) => {
    socket.to(roomname).emit('offer', offer);
  });

  socket.on('answer', (answer, roomname) => {
    socket.to(roomname).emit('answer', answer);
  });
});

// 소켓 io
// instrument(wsServer, {
//   auth: false,
// });

// const publicRooms = () => {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = wsServer;

//   const publicRooms = [];

//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });

//   return publicRooms;
// };

// const countRoom = (roomName) => {
//   return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// };

// wsServer.on('connection', (socket) => {
//   // wsServer.socketsJoin("announcement");
//   socket['nickname'] = 'Anonymous';

//   socket.onAny((event) => {
//     console.log(`Socket Event: ${event}`);
//     console.log(wsServer.sockets.adapter);
//   });

//   socket.on('enter_room', (roomName, done) => {
//     socket.join(roomName);
//     done();
//     socket.to(roomName).emit('welcome', socket.nickname, countRoom(roomName));
//     wsServer.sockets.emit('room_change', publicRooms());
//   });

//   socket.on('new_message', (message, room, done) => {
//     socket.to(room).emit('new_message', `${socket.nickname}: ${message}`);
//     done();
//   });

//   socket.on('nickname', (nickname) => (socket['nickname'] = nickname));

//   socket.on('disconnecting', () => {
//     socket.rooms.forEach((room) =>
//       socket.to(room).emit('bye', socket.nickname, countRoom(room) - 1)
//     );
//   });

//   socket.on('disconnect', () => {
//     wsServer.sockets.emit('room_change', publicRooms());
//   });
// });

// 웹소켓
// const wss = new WebSocket.Server({ server });
// const sockets = [];

// // callback 으로 socket 을 받아서 사용할 수 있다.
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   console.log("Connected to Browser ✅");

//   socket.on("close", () => console.log("Disconnected from the Browser ❌"));

//   socket.on("message", (msg) => {
//     // const messageString = message.toString("utf8");
//     const message = JSON.parse(msg);

//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname} : ${message.payload}`)
//         );

//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });

httpServer.listen(5050, handleListen);
