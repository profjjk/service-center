const router = require("express").Router();
const partController = require("../../controllers/partController");

router.route("/")
    .get(partController.findAllByCompanyId)
    .post(partController.create)

router.route('/:id')
    .get(partController.findById)
    .put(partController.updateById)
    .delete(partController.deleteById)

module.exports = router;
