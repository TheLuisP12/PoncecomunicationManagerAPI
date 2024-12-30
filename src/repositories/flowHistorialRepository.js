const FlowHistorial = require("../models/flowHistorialModel");

const createHistorial = async (data) => {
    return await FlowHistorial.create(data);
};

const getHistorialById = async (id) => {
    return await FlowHistorial.findById(id).populate("userId", "name");
};

const updateHistorial = async (id, updates) => {
    return await FlowHistorial.findByIdAndUpdate(id, updates, { new: true });
};

const listHistoriales = async (filter, page, limit) => {
    const skip = (page - 1) * limit;
    const historiales = await FlowHistorial.find(filter)
        .populate("userId", "name")
        .skip(skip)
        .limit(limit)
        .sort({ lastStateDate: -1 });

    const total = await FlowHistorial.countDocuments(filter);
    return { historiales, total };
};

const addStateToHistorial = async (id, newState) => {
    const historial = await FlowHistorial.findById(id);
    if (!historial) {
        throw new Error("Historial not found");
    }

    historial.states.push(newState);
    historial.lastStateDate = newState.date || Date.now();
    return await historial.save();
};

module.exports = {
    createHistorial,
    getHistorialById,
    updateHistorial,
    listHistoriales,
    addStateToHistorial
};
