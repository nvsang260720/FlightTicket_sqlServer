const express = require('express');
const router = express.Router();

const PersonnelController = require('../../controller/Backend/PersonnelControler')

router.get('/', PersonnelController.getHome)

module.exports = router;