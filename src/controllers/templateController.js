const templateService = require("../services/templateService");

const createTemplate = async (req, res) => {
    try {
        const template = await templateService.createTemplate(req.body);
        res.status(201).json({ message: "Template created successfully", data: template });
    } catch (error) {
        res.status(500).json({ message: "Error creating template", error: error.message });
    }
};

const listTemplates = async (req, res) => {
    try {
        const templates = await templateService.listTemplates();
        res.json({ data: templates });
    } catch (error) {
        res.status(500).json({ message: "Error listing templates", error: error.message });
    }
};

module.exports = {
    createTemplate,
    listTemplates,
};
