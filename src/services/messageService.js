const messageRepository = require("../repositories/messageRepository");
const {getTemplateByCode} = require("../repositories/templateRepository");
const {listUsers} = require("../repositories/userRepository");

const createMessage = async (messageData) => {
    // Procesar plantilla para incluir el nombre del destinatario
    //const user = await User.findById(messageData.to);
    //if (!user) throw new Error("User not found");

    const users = await listUsers({ _id: { $in: messageData.to } });
    if (users.length !== messageData.to.length) {
        throw new Error("One or more users not found");
    }
    

    const template = await getTemplateByCode(messageData.template);
    if (!template) throw new Error("Template not found");

    //const processedMessage = messageData.template.replace("{{1}}", user.name);
    const processedMessage = template.content.replace("{{1}}", users.map((u) => u.name).join(", "));


    return await messageRepository.createMessage({
        ...messageData,
        content: processedMessage,
    });
};

const getMessageById = async (id) => {
    return await messageRepository.getMessageById(id);
};

const updateMessage = async (id, updates) => {
    return await messageRepository.updateMessage(id, updates);
};

const listMessages = async (filter, page = 1, limit = 10) => {
    return await messageRepository.listMessages(filter, page, limit);
};

const listPendingConfirmations = async () => {
    return await messageRepository.listPendingConfirmations();
};

const bulkUpdateMessages = async (ids, updates) => {
    return await messageRepository.bulkUpdateMessages(ids, updates);
};

const deleteMessageById = async (id) => {
    return await messageRepository.deleteById(id);
};




module.exports = {
    createMessage,
    getMessageById,
    updateMessage,
    listMessages,
    listPendingConfirmations,
    bulkUpdateMessages,
    deleteMessageById,
};
