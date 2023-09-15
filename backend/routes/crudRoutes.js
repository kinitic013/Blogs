const {Router} = require('express');
const crudController = require('../controllers/crudControllers');
const router = Router(); 

router.get('/resetAll',crudController.reset_get);
router.post('/create',crudController.create_post);
router.post('/update',crudController.update_post);
router.post('/delete',crudController.delete_post);

module.exports = router ; 
