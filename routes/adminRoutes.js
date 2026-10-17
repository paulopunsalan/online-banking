const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { requireAdmin } = require("../middleware/auth");

router.get("/", requireAdmin, adminController.dashboard);
router.get("/create", requireAdmin, adminController.showCreateCustomer);
router.post("/create", requireAdmin, adminController.createCustomer);

module.exports = router;