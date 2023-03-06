const router = require('express').Router();
const jobController = require('../../controllers/jobController');

router.route('/')
    .post(jobController.create);

router.route('/:id')
    .get(jobController.findAllByCompanyId)
    .put(jobController.updateById)
    .delete(jobController.deleteById);

router.route('/clear/:id')
    .delete(jobController.deleteMany);


module.exports = router;
