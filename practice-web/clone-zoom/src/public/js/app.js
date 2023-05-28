const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  // message의 data, timeStamp 등의 정보를 가지고 있다.
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

const makeMessage = (type, payload) => {
  const message = { type, payload };
  return JSON.stringify(message);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);
