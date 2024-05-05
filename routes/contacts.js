const router = require("express").Router();
const contactController = require("../controllers/contacts");

router.get('/', contactController.getAll);

router.get('/:id', contactController.getID);

router.get('/gender/:filter', contactController.getGender);

router.post('/', contactController.createContact);

router.put('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;