const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
// const fs = require('fs');
// const https = require('https');
const index = require("./routes/index");


// const privateKey  = fs.readFileSync('certs/server.key', 'utf8');
// const certificate = fs.readFileSync('certs/server.crt', 'utf8');

//const credentials = {key: privateKey, cert: certificate};

// const {getEventList} = require("./googleConnect/calendar")

// creating app

// const index = require("./routes/index");
// app.use(index);


const app = express();
app.use(index);


app.post('/hello_world', (req, res) => {
  res.send('hello world')
})

app.get('/hello_world', (req, res) => {
  res.send('hello world')
})
// creating servers
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

// http port defaults
const httpPort = process.env.PORT || 8080;
// const httpsPort = process.env.PORT || 8443;

// adding io framework
const ioHttp = socketIo(httpServer);
//const ioHttps = socketIo(httpsServer);


ioHttp.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    5000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// ioHttps.on("connection", socket => {
//     console.log("New client connected"), setInterval(
//       () => getApiAndEmit(socket),
//       10000
//     );
//     socket.on("disconnect", () => console.log("Client disconnected"));
//   });

const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://api.darksky.net/forecast/dceef8346c9ef299f4e273d7fb96dd82/43.7695,11.2558"
    );
    socket.emit("FromAPI", res.data.currently.temperature);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};


// launching servers
// httpsServer.listen(httpPort, () => console.log(`Http server listening on port ${httpPort}`));
httpServer.listen(httpPort, () => console.log(`Http server listening on port ${httpPort}`));
