const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    campaign: { type: String, required: true },
    temperature: { type: String, enum: ["frio", "tibio", "caliente"], required: true },
    affiliated: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true, // Habilita createdAt y updatedAt
    }
);

module.exports = mongoose.model("User", userSchema);
