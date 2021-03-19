const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');

let ws;

function showMessage(message) {
  messages.textContent += `\n\n${message}`;
  messages.scrollTop = messages.scrollHeight;
  messageInput.value = '';
}

function init() {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  ws = new WebSocket('ws://localhost:6969');
  ws.onopen = () => {
    console.log('Connection opened!');
  }
  ws.onmessage = ({ data }) => showMessage(data);
  ws.onclose = function () {
    ws = null;
  }
}

sendBtn.onclick = function () {
  if (!ws) {
    showMessage("No WebSocket connection :(");
    return;
  }

  ws.send(messageInput.value);
  showMessage(messageInput.value);
}

init();