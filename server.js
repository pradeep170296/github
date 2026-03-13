const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");

app.use(express.static("public"));
app.use(express.json());

const users = JSON.parse(fs.readFileSync("users.json"));

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user)
        res.json({ status: "ok" });
    else
        res.json({ status: "fail" });

});

io.on("connection", socket => {

    socket.on("offer", data => {
        socket.broadcast.emit("offer", data);
    });

    socket.on("answer", data => {
        socket.broadcast.emit("answer", data);
    });

    socket.on("ice", data => {
        socket.broadcast.emit("ice", data);
    });

});

http.listen(3000, () =>
    console.log("Server running 3000")
);
