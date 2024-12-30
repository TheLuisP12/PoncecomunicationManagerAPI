const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre de la plantilla, ej: "Plantilla 1"
    code: { type: String, required: true, unique: true }, // Código único, ej: "M1"
    content: { type: String, required: true }, // Mensaje asociado, ej: "Sr. {{1}}, buenas tardes..."
    },
    {
        timestamps: true,
    }
    );

module.exports = mongoose.model("Template", templateSchema);
