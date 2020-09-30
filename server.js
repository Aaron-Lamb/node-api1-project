const express = require("express");
const database = require('./database');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: "Hello from Node/Express" });
});

server.get('/users', (req, res) => {
    const users = database.getUsers();
    res.json(users);
});

server.listen(8000, () => {
    console.log("Server Listening on port 8000")
})