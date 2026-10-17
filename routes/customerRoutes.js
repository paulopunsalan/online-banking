const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const { requireCustomer } = require("../middleware/auth");

router.get("/", requireCustomer, customerController.dashboard);
router.post("/deposit", requireCustomer, customerController.deposit);
router.post("/withdraw", requireCustomer, customerController.withdraw);

module.exports = router;