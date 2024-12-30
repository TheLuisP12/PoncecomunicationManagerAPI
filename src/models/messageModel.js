const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Lista de destinatarios
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true }, // Referencia a una plantilla
    content: { type: String, required: true }, // Mensaje procesado
    scheduled: { type: Boolean, default: false },
    sendDate: { type: Date, required: true },
    needsConfirmation: { type: Boolean, default: true },
    confirmed: { type: Boolean, default: false },
    status: { type: String, enum: ["Pendiente", "Enviado"], default: "Pendiente" },
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model("Message", messageSchema);