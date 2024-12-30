const Template = require("../models/templateModel");

const createTemplate = async (templateData) => {
    return await Template.create(templateData);
};

const getTemplateByCode = async (code) => {
    return await Template.findOne({ code });
};

const listTemplates = async () => {
    return await Template.find({});
};

module.exports = {
    createTemplate,
    getTemplateByCode,
    listTemplates,
};
