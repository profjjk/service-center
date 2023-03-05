const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/')
    .get(userController.findAllByCompanyId)
    .post(userController.create)

router.route('/:id')
    .get(userController.findById)
    .put(userController.updateById)
    .delete(userController.deleteById)

module.exports = router;