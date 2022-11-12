// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

// Import contact controller
var contactController = require('./contactController');// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/deleteall')
    .delete(contactController.deleteAll)

// Export API routes
module.exports = router;

