const userService = require("../services/userService");

const createUser = async (req, res) => {
    try {
        const user = await userService.addUser(req.body);
        res.status(201).json({ message: "User created successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ data: user });
    } catch (error) {
        res.status(500).json({ message: "Error getting user", error: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await userService.listUsers();
        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Error listing users", error: error.message });
    }
};

module.exports = { 
    createUser,
    getUserById,
    listUsers
};
