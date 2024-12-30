const messageService = require("../services/messageService");
const {listUsers} = require("../services/userService");

const createMessage = async (req, res) => {
    try {
        const { to, template, sendDate, scheduled, needsConfirmation } = req.body;

        // Buscar el usuario destinatario
        //const user = await User.findById(to);
        //if (!user) return res.status(404).json({ message: "User not found" });

        const users = await listUsers({ _id: { $in: to } });
        if (users.length !== to.length) {
            return res.status(404).json({ message: "One or more users not found" });
        }

        const recipientNames = users.map((user) => user.name).join(", ");

        const message = await messageService.createMessage({
            to,
            //toName: user.name, // Se pasa el nombre del usuario para el procesamiento de la plantilla
            toName: recipientNames,
            template,
            sendDate,
            scheduled,
            needsConfirmation,
        });

        res.status(201).json({ message: "Message created successfully", data: message });
    } catch (error) {
        res.status(500).json({ message: "Error creating message", error: error.message });
    }
};


const getMessage = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.id);
        if (!message) return res.status(404).json({ message: "Message not found" });
        res.json({ data: message });
    } catch (error) {
        res.status(500).json({ message: "Error fetching message", error: error.message });
    }
};

const updateMessage = async (req, res) => {
    try {
        const updatedMessage = await messageService.updateMessage(req.params.id, req.body);
        if (!updatedMessage) return res.status(404).json({ message: "Message not found" });
        res.json({ message: "Message updated successfully", data: updatedMessage });
    } catch (error) {
        res.status(500).json({ message: "Error updating message", error: error.message });
    }
};

const listMessages = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const messages = await messageService.listMessages({}, parseInt(page), parseInt(limit));
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error listing messages", error: error.message });
    }
};

const listPendingConfirmations = async (req, res) => {
    try {
        const messages = await messageService.listPendingConfirmations();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error listing pending confirmations", error: error.message });
    }
};

const updateBulkConfirmations = async (req, res) => {
    try {
        const { ids, updates } = req.body;
        const result = await messageService.bulkUpdateMessages(ids, updates);
        res.json({ message: "Messages updated successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error updating messages", error: error.message });
    }
};


const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await messageService.deleteMessageById(id);

        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting message", error: error.message });
    }
};


module.exports = {
    createMessage,
    getMessage,
    updateMessage,
    listMessages,
    listPendingConfirmations,
    updateBulkConfirmations,
    deleteMessage,
};
