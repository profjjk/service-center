const router = require('express').Router();
const customerController = require('../../controllers/customerController');

router.route('/')
    .post(customerController.create)

router.route('/:id')
    .get(customerController.findAllByCompany)
    .put(customerController.updateById)
    .delete(customerController.delete)

module.exports = router;
