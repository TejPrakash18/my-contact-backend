const express = require("express");
const validateToken = require("../middleware/validTokenHandler");
const {

    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}= require("../controller/contactController");


const router = express.Router();


router.use(validateToken)
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;