// Dependencies
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

// Define a port
const port = 6969
// create a server
const server = http.createServer(express)
// Open a web socket
const wss = new WebSocket.Server({ server })

// https://github.com/websockets/ws

// Handle a web socket connection
wss.on('connection', (ws) => {
	// After making a connection start listening for messages
	console.log('client connecting')

  ws.on('message', (data) => {
		// For each client broadcast the data
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    })
  })
})

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on ${port}!`)
})


// const obj = { 
//   a: 11,  // A property 
//   b: 222, 
//   c: function () { 
//     console.log('hello') 
//   } 
// }
// console.log(obj.a) // 11
// obj.c() // hello
// const json = JSON.stringify(obj)  // turn into string 
// // '{ "a": 11, "b": 222 }'
// // string, array, obj, number, true/false, null 
// json.a // error cannot access property a of string 

// const newObj = JSON.parse(json)

