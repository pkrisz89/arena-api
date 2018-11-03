const express = require("express");
const app = express();

const isProd = process.env.NODE_ENV === "prod";
const PORT = isProd ? process.env.PORT : 9000;

function getCallerIP(request) {
  let ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;

  let port =
    request.connection.remotePort ||
    request.socket.remotePort ||
    request.connection.socket.remotePort;

  ip = ip.split(",")[0];
  ip = ip.split(":").slice(-1);
  return { ip, port };
}

app.get("/", function(req, res) {
  const { ip, port } = getCallerIP(req);
  res.send(`HELLO HUMAN FROM ${ip}${port}`);
});

app.listen(PORT, () =>
  console.log(`Listening to ${PORT} in ${process.env.NODE_ENV} mode`)
);
