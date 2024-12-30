const express = require("express");
const {
    createMessage,
    getMessage,
    updateMessage,
    listMessages,
    listPendingConfirmations,
    updateBulkConfirmations,
    deleteMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", createMessage);

router.get("/", listMessages);
router.get("/pending-confirmations", listPendingConfirmations);
router.put("/bulk-update", updateBulkConfirmations);

router.get("/:id", getMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
