const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fs = require("fs");

app.use(express.static("public"));
app.use(express.json());

function getUsers()
{
    return JSON.parse(
        fs.readFileSync("users.json")
    );
}

function saveUsers(data)
{
    fs.writeFileSync(
        "users.json",
        JSON.stringify(data, null, 2)
    );
}

/* LOGIN */

app.post("/login", (req, res) => {

    const users = getUsers();

    const user = users.find(
        u =>
            u.username == req.body.username &&
            u.password == req.body.password
    );

    if (!user)
        return res.json({ status: "fail" });

    res.json({
        status: "ok",
        role: user.role
    });

});


/* GET USERS */

app.get("/users", (req, res) => {

    res.json(getUsers());

});


/* ADD USER */

app.post("/addUser", (req, res) => {

    let users = getUsers();

    users.push(req.body);

    saveUsers(users);

    res.json({ status: "ok" });

});


/* DELETE USER */

app.post("/deleteUser", (req, res) => {

    let users = getUsers();

    users =
        users.filter(
            u => u.username != req.body.username
        );

    saveUsers(users);

    res.json({ status: "ok" });

});


/* SOCKET */

io.on("connection", socket => {

    console.log("Connected");

});


http.listen(3000, () =>
    console.log("Server running")
);
