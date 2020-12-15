const MultiColumnsModule = require("../models/module_multi_columns.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_multi_columns'`
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

// Create and Save a new MultiColumns
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save MultiColumns in the database
  MultiColumnsModule.create(new MultiColumnsModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_multi_columns'."));
};

// Retrieve MultiColumnss from the database.
exports.getAll = (req, res) => {
  MultiColumnsModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_multi_columns's.")
  );
};

// Retrieve MultiColumnss Length from the database.
exports.getLength = (req, res) => {
  MultiColumnsModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_multi_columns' length."));
};

// Find a single MultiColumns with a multiColumnsId
exports.get = (req, res) => {
  MultiColumnsModule.getById(req.params.multiColumnsId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_multi_columns' with multiColumnsId " + req.params.multiColumnsId));
};

// Find a single MultiColumns Detail with a multiColumnsId
exports.getDetail = (req, res) => {
  MultiColumnsModule.getDetailById(req.params.multiColumnsId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_multi_columns' with multiColumnsId " + req.params.multiColumnsId));
};

// Update a MultiColumns identified by the multiColumnsId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  MultiColumnsModule.updateById(req.params.multiColumnsId, new MultiColumnsModule(req.body), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_multi_columns' with multiColumnsId " + req.params.multiColumnsId)
  );
};

// Delete a MultiColumns with the specified multiColumnsId in the request
exports.delete = (req, res) => {
  MultiColumnsModule.remove(req.params.multiColumnsId, (err, data) => resCallback(res, err, data, "Could not delete 'module_multi_columns' with multiColumnsId " + req.params.multiColumnsId));
};

// Delete MultiColumnss from the database.
exports.deleteAll = (req, res) => {
  MultiColumnsModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_multi_columns's."));
};