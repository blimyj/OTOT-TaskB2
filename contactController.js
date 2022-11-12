// Import contact model
Contact = require('./contactModel');

// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.status(500).json({
                status: "error",
                message: err,
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Contacts retrieved successfully",
                data: contacts
            });
        }
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // save the contact and check for errors
    contact.save(function (err) {
        if (err && err.name == "ValidationError") {
            res.status(400).json(err)
        } else if (err) {
            res.status(500).json(err)
        } else {
            res.status(200).json({
                message: 'New contact created!',
                data: contact
        });
        }
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err && err.name == "CastError") {
            res.status(404).json({
                message: 'Invalid Contact ID provided.',
                error: err
            })
        } else if (err) {
            res.status(500).send(err);
        } else if (contact == null){
            res.status(200).json({
                message: 'Contact details not found. :(',
                data: contact
            });
        } else {
            res.status(200).json({
                message: 'Contact details loading..',
                data: contact
            });
        }
    });
};

// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        console.log(contact)
        if (err && err.name == "CastError") {
            res.status(404).json({
                message: 'Invalid Contact ID provided.',
                error: err
            })
        } else if (err) {
            res.status(500).send(err)
        } else {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.gender = req.body.gender ? req.body.gender : contact.gender;
            contact.email = req.body.email ? req.body.email : contact.email;
            contact.phone = req.body.phone ? req.body.phone : contact.phone;
            contact.save(function (err) {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json({
                        message: 'Contact Info updated',
                        data: contact
                    })
                }
            })
        }
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err && err.name == "CastError") {
            res.status(404).json({
                message: 'Invalid Contact ID provided.',
                error: err
            })
        } else if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json({
                message: 'Contact deleted'
            });
        }
    });
};