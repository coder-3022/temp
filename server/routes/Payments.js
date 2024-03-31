const express = require("express");

const router = express.Router();

const {
    capturePayment,
    verifySignature,
} = require("../controllers/Payments");

const {
    auth,
    isStudent,
    isInstructor,
    isAdmin,
} = require("../middlewares/auth");


router.post("/capturePayment",capturePayment)
router.post("/verifySignature",auth, isStudent, verifySignature)
// router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;




