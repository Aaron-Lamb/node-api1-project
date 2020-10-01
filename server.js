const express = require("express");
const database = require('./database');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: "Hello from Node/Express" });
});

server.get('/users', (req, res) => {
    const users = database.getUsers();
    if(users) {
        res.json(users);
    } else {
        return res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = database.getUsersById(id);
    try{
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: "User not found"
            });
        };
    }
    catch(error){
        return res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        })
    }
})

server.post('/users', (req, res) => {
    
    if(!req.body.name || !req.body.bio) {
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    const newUser = database.createUser({
        name: req.body.name,
        bio: req.body.bio
    })

    if(newUser) {
        res.status(201).json(newUser)
    } else {
       return res.status(500).json({
            errorMessage: "There was an error while saving the user to the database" 
        })
    }
})

server.put("/users/:id", (req, res) => {
	const id = req.params.id
	const user = database.getUsersById(id)

	try{
        if(user) {
            const updatedUser = database.updateUser(id, {
                name: req.body.name,
                bio: req.body.bio
            })
    
            res.json(updatedUser)
        } else {
            return res.status(404).json({
                message: "User not found"
            })
        }
    }
    catch(errors){
        return res.status(500).json({
            errorMessage: "There was an error while saving the user to the database" 
        })
    }
})

server.delete('/users/:id', (req, res) => {
	const id = req.params.id
	const user = database.getUsersById(id)

	try{
        if(user) {
            database.deleteUser(id)
            return res.status(204).end()
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    }
    catch(error){
        return res.status(404).json({
			message: "User not found"
		})
    }
})

server.listen(8000, () => {
    console.log("Server Listening on port 8000")
})