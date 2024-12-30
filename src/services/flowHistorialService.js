const flowHistorialRepository = require("../repositories/flowHistorialRepository");

const createHistorial = async (data) => {
    return await flowHistorialRepository.createHistorial(data);
};

const getHistorialById = async (id) => {
    return await flowHistorialRepository.getHistorialById(id);
};

const updateHistorial = async (id, updates) => {
    return await flowHistorialRepository.updateHistorial(id, updates);
};

const listHistoriales = async (filter, page = 1, limit = 10) => {
    return await flowHistorialRepository.listHistoriales(filter, page, limit);
};

const addStateToHistorial = async (id, newState) => {
    return await flowHistorialRepository.addStateToHistorial(id, newState);
};

module.exports = {
    createHistorial,
    getHistorialById,
    updateHistorial,
    listHistoriales,
    addStateToHistorial
};
