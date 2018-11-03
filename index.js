const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const randToken = require("rand-token");

const isProd = process.env.NODE_ENV === "prod";
const PORT = isProd ? process.env.PORT : 9000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

function getCallerIP(request) {
  let ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;

  let port =
    request.headers["x-forwarded-port"] ||
    request.connection.remotePort ||
    request.socket.remotePort ||
    request.connection.socket.remotePort;

  ip = ip.split(",")[0];
  ip = ip.split(":").slice(-1);
  return { ip, port };
}

const users = [];

app.get("/", (req, res) => {
  const { ip, port } = getCallerIP(req);
  res.send(`HELLO HUMAN FROM ${ip}:${port}`);
});

app.post("/register", (req, res) => {
  const { userName } = req.body;
  const { ip, port } = getCallerIP(req);
  const token = randToken.generate(16);

  const doesUserExist = users.some(user => user.userName === userName);

  if (doesUserExist) {
    return res.json({ success: false, message: "User already registered." });
  }

  if (!userName) {
    return res.json({
      success: false,
      message: "Define your userName in the post body."
    });
  }

  users.push({ userName, token, ip, port });
  return res.json({ userName, token });
});

app.listen(PORT, () =>
  console.log(`Listening to ${PORT} in ${process.env.NODE_ENV} mode`)
);
