const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to my first REST API!"
    });
});

// Sample Data
let users = [
    { id: 1, name: "Prathamesh", age: 18 },
    { id: 2, name: "Rahul", age: 20 }
];

// GET all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// POST user
app.post("/users", (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        user: newUser
    });
});

// PUT user
app.put("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, age } = req.body;

    if (name) user.name = name;
    if (age) user.age = age;

    res.status(200).json({
        message: "User updated",
        user
    });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(userIndex, 1);

    res.status(200).json({
        message: "User deleted"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});