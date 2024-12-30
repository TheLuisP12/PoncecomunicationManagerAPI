const User = require("../models/userModel");

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const listUsers = async (filter) => {
    const users = await User.find(filter);
    return users;
};

module.exports = { 
    createUser,
    getUserById,
    listUsers
};
