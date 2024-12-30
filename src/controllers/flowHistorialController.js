const flowHistorialService = require("../services/flowHistorialService");
const userService = require("../services/userService");

const createHistorial = async (req, res) => {
    try {
        const { userId, states = [], lastStateDate = null } = req.body;

        //Validar que el usuario exista
        const user = await userService.getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const historial = await flowHistorialService.createHistorial({
            userId,
            states,
            lastStateDate
        });

        res.status(201).json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error creating historial", error: error.message });
    }
};

const getHistorialById = async (req, res) => {
    try {
        const historial = await flowHistorialService.getHistorialById(req.params.id);
        if (!historial) return res.status(404).json({ message: "Historial not found" });
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error fetching historial", error: error.message });
    }
};

const updateHistorial = async (req, res) => {
    try {
        const historial = await flowHistorialService.updateHistorial(req.params.id, req.body);
        if (!historial) return res.status(404).json({ message: "Historial not found" });
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error updating historial", error: error.message });
    }
};

const listHistoriales = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filter } = req.query;
        const historiales = await flowHistorialService.listHistoriales(filter, page, limit);
        res.status(200).json(historiales);
    } catch (error) {
        res.status(500).json({ message: "Error fetching historiales", error: error.message });
    }
};

const addStateToHistorial = async (req, res) => {
    try {
        const newState = req.body; // state, description, date
        const historial = await flowHistorialService.addStateToHistorial(req.params.id, newState);
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error adding state to historial", error: error.message });
    }
};

module.exports = {
    createHistorial,
    getHistorialById,
    updateHistorial,
    listHistoriales,
    addStateToHistorial
};
