const router = require('express').Router();
const customerController = require('../../controllers/customerController');

router.route('/')
    .post(customerController.create)

router.route('/:id')
    .get(customerController.findAllByCompanyId)
    .put(customerController.updateById)
    .delete(customerController.deleteById)

router.route('/many/:id')
    .delete(customerController.deleteMany)

module.exports = router;
