const templateRepository = require("../repositories/templateRepository");

const createTemplate = async (templateData) => {
    const existingTemplate = await templateRepository.getTemplateByCode(templateData.code);
    if (existingTemplate) throw new Error("Template with this code already exists");
    return await templateRepository.createTemplate(templateData);
};

const listTemplates = async () => {
    return await templateRepository.listTemplates();
};

const getTemplateByCode = async (code) => {
    const template = await templateRepository.getTemplateByCode(code);
    if (!template) throw new Error("Template not found");
    return template;
};

module.exports = {
    createTemplate,
    listTemplates,
    getTemplateByCode,
};
