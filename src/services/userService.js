const userRepository = require("../repositories/userRepository");

const addUser = async (userData) => {
    // Validaciones adicionales pueden ser agregadas aquí
    return await userRepository.createUser(userData);
};

const getUserById = async (id) => {
    return await userRepository.getUserById(id);
};

const listUsers = async (users) => {
    return await userRepository.listUsers(users);
};

module.exports = { 
    addUser,
    getUserById,
    listUsers,
 };
