const express = require("express");
const router = express.Router();
const {
    createHistorial,
    getHistorialById,
    updateHistorial,
    listHistoriales,
    addStateToHistorial
} = require("../controllers/flowHistorialController");

// Crear un nuevo historial
router.post("/", createHistorial);

// Listar historiales con paginación
router.get("/", listHistoriales);

// Agregar un nuevo estado a un historial
router.put("/:id/add-state", addStateToHistorial);

// Obtener un historial por ID
router.get("/:id", getHistorialById);

// Actualizar un historial por ID
router.put("/:id", updateHistorial);

module.exports = router;
