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

server.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = database.getUsersById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: "User not found"
        });
    };
})

server.listen(8000, () => {
    console.log("Server Listening on port 8000")
})