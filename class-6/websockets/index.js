// Get references to DOM elements
const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');

let ws;

function showMessage(message) {
  messages.innerHTML += `${message}\n\n`;
  messages.scrollTop = messages.scrollHeight;
  messageInput.value = '';
}

function init() {
  // Clean up before restarting a websocket connection
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  // Make a new Websocket
  ws = new WebSocket('ws://localhost:6969');
  // Handle the connection when it opens
  ws.onopen = () => {
    console.log('Connection opened!');
  }
  // handle a message event
  ws.onmessage = ({ data }) => showMessage(data);
  // Handle a close event
  ws.onclose = function () {
    ws = null;
  }
}

// Handle button clicks
sendBtn.onclick = function () {
  // Send a message
  if (!ws) {
    showMessage("No WebSocket connection :(");
    return;
  }

  ws.send(messageInput.value);
  showMessage(messageInput.value);
}

init();