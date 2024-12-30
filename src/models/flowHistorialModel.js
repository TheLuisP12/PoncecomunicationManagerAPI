const mongoose = require("mongoose");

const flowHistorialSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    states: [
        {
            state: { type: String, required: true },
            description: { type: String },
            date: { type: Date, required: true, default: Date.now }
        }
    ],
    lastStateDate: { type: Date,  default: Date.now},
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("FlowHistorial", flowHistorialSchema);
