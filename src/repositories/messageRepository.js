const Message = require("../models/messageModel");
const {getTemplateByCode} = require("../repositories/templateRepository");

const createMessage = async (messageData) => {
    // Obtener la plantilla por código
    const template = await getTemplateByCode(messageData.template);
    if (!template) throw new Error("Template not found");
    return await Message.create({
        ...messageData,
        template: template._id, // Guardar la referencia a la plantilla
    });
};


const getMessageById = async (id) => {
    return await Message.findById(id).populate("to", "name"); // Incluye solo el nombre del usuario
};

const updateMessage = async (id, updates) => {
    return await Message.findByIdAndUpdate(id, updates, { new: true });
};

const listMessages = async (filter, page, limit) => {
    const skip = (page - 1) * limit;
    const messages = await Message.find(filter)
        .populate("to", "name")
        .skip(skip)
        .limit(limit)
        .sort({ sendDate: -1 });
    const total = await Message.countDocuments(filter);
    return { messages, total };
};

const listPendingConfirmations = async () => {
    return await Message.find({ confirmed: false }).populate("to", "name").populate("template", "code");
};

const bulkUpdateMessages = async (ids, updates) => {
    return await Message.updateMany({ _id: { $in: ids } }, updates);
};

const deleteById = async (id) => {
    return await Message.findByIdAndDelete(id);
};

module.exports = {
    createMessage,
    getMessageById,
    updateMessage,
    listMessages,
    listPendingConfirmations,
    bulkUpdateMessages,
    deleteById,
};
