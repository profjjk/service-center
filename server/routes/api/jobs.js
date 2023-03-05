const router = require('express').Router();
const jobController = require('../../controllers/jobController');

router.route('/')
    .get(jobController.findAllByCompanyId)
    .post(jobController.create);

router.route('/:id')
    .get(jobController.findById)
    .put(jobController.updateById)
    .delete(jobController.deleteById);

router.route('/clear/:id')
    .delete(jobController.deleteMany);


module.exports = router;
