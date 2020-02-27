const express = require("express");

const app = express();
const server = app.listen(4000, () => {
  //Start the server, listening on port 4000.
  console.log("Listening to requests on port 4000...");
});

const io = require("socket.io")(server); //Bind socket.io to our express server.

app.use(express.static("public")); //Send index.html page on GET /

const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600,
  parity: "none",
  dataBits: 8,
  stopBits: 1
});
//Connect serial port to port COM3. Because my Arduino Board is connected on port COM3.
//See yours on Arduino IDE -> Tools -> Port
const parser = port.pipe(new Readline({ delimiter: "\r" })); //Read the line only when new line comes.'
parser.on("data", temp => {
  //Read data
  const today = new Date();
  io.sockets.emit("temp", {
    date:
      today.getDate() + "-" + today.getMonth() + 1 + "-" + today.getFullYear(),
    time: today.getHours() + ":" + today.getMinutes(),
    temp: temp
  }); //emit the datd i.e. {date, time, temp} to all the connected clients.
});

io.on("connection", socket => {
  console.log("Someone connected."); //show a log as a new client connects.
});
