const express = require("express");
const { createTemplate, listTemplates } = require("../controllers/templateController");

const router = express.Router();

router.post("/", createTemplate);
router.get("/", listTemplates);

module.exports = router;
