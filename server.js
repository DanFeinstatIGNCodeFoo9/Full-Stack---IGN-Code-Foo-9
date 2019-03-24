const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
const path = require(`path`);
const dotenv = require(`dotenv`);
const routes = require(`./routes`);
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const PORT = process.env.PORT || 3002;

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`);
  // res.setHeader(`Access-Control-Allow-Headers`);
  next();
});

dotenv.config({ path: `.env` });

app.set(`secretKey`, `nodeRestApi`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.use((req, res, next) => {
  let err = new Error(`Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 404) {
    res.status(404).json({ messsage: `Not found` });
  } else {
    res.status(500).json({ message: `Something looks wrong` });
  }
});

if (process.env.NODE_ENV === `production`) {
  app.use(express.static(path.join(__dirname, `client/build`)));
  app.get(`*`, (req, res) => {
    res.sendFile(path.resolve(__dirname, `client`, `build`, `index.html`));
  });
}

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/chatIGN`, {
  useNewUrlParser: true,
});

io.on(`connection`, function(socket) {
  console.log(`a new user is connected: ${socket.id}`);
  socket.on("userLoggedIn", data => {
    console.log(data);
    socket.broadcast.emit("userConnected", {
      connectionId: data.socketId,
      userId: data.userId,
    });
  });
  socket.on("sendingGenMessage", data => {
    console.log(data);
    socket.emit("newGenMessage", {
      data,
    });
  });
  socket.on("disconnect", () => console.log(`${socket.id} has disconnected`));
});

server.listen(PORT, () => {
  console.log(`Listening on port: ` + PORT);
});
