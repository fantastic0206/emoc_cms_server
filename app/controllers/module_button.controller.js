const ButtonModule = require("../models/module_button.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_button'`
      });
    } else {
      res.status(500).send({
        message:
          defaultErrMessage || err.message || "Internal server error"
      });
    }
  } else {
    res.send(data);
  }
};

// Create and Save a new Button
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Button in the database
  ButtonModule.create(new ButtonModule({...req.body, icon: req.files.icon}), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_button'."));
};

// Retrieve Buttons from the database.
exports.getAll = (req, res) => {
  ButtonModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_button's.")
  );
};

// Retrieve Buttons Length from the database.
exports.getLength = (req, res) => {
  ButtonModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_button' length."));
};

// Find a single Button with a buttonId
exports.get = (req, res) => {
  ButtonModule.getById(req.params.buttonId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_button' with buttonId " + req.params.buttonId));
};

// Find a single Button Detail with a buttonId
exports.getDetail = (req, res) => {
  ButtonModule.getDetailById(req.params.buttonId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_button' with buttonId " + req.params.buttonId));
};

// Update a Button identified by the buttonId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  ButtonModule.updateById(req.params.buttonId, new ButtonModule({...req.body, icon: req.files.icon}), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_button' with buttonId " + req.params.buttonId)
  );
};

// Delete a Button with the specified buttonId in the request
exports.delete = (req, res) => {
  ButtonModule.remove(req.params.buttonId, (err, data) => resCallback(res, err, data, "Could not delete 'module_button' with buttonId " + req.params.buttonId));
};

// Delete Buttons from the database.
exports.deleteAll = (req, res) => {
  ButtonModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_button's."));
};