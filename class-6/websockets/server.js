// Dependencies
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Define a port
const port = 6969;
// create a server
const server = http.createServer(express);
// Open a web socket
const wss = new WebSocket.Server({ server })

// Handle a 
wss.on('connection', function connection(ws) {
	// After making a connection start listening for messages
  ws.on('message', function incoming(data) {
		// For each client broadcast the data
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

// Start the server
server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})