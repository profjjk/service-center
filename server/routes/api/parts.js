const router = require('express').Router();
const partController = require('../../controllers/partController');

router.route("/")
    .post(partController.create)

router.route('/:id')
    .get(partController.findAllByCompanyId)
    .put(partController.updateById)
    .delete(partController.deleteById)

router.route('/many/:id')
    .delete(partController.deleteMany);

module.exports = router;
