const router = require('express').Router();
const companyController = require('../../controllers/companyController');

router.route('/')
    .get(companyController.findAll)
    .post(companyController.create)

router.route('/:id')
    .get(companyController.findById)
    .put(companyController.updateById)
    .delete(companyController.deleteById)

module.exports = router;