const express = require("express");
const { createUser, getUserById, listUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/users", createUser)
router.get("/users", listUsers);
router.get("/users/:id", getUserById);

module.exports = router;
