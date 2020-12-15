const HeaderModule = require("../models/module_header.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_header'`
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

// Create and Save a new Header
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Header in the database
  HeaderModule.create(new HeaderModule({...req.body, icon: req.files.icon}), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_header'."));
};

// Retrieve Headers from the database.
exports.getAll = (req, res) => {
  HeaderModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_header's.")
  );
};

// Retrieve Headers Length from the database.
exports.getLength = (req, res) => {
  HeaderModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_header' length."));
};

// Find a single Header with a headerId
exports.get = (req, res) => {
  HeaderModule.getById(req.params.headerId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_header' with headerId " + req.params.headerId));
};

// Find a single Header Detail with a headerId
exports.getDetail = (req, res) => {
  HeaderModule.getDetailById(req.params.headerId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_header' with headerId " + req.params.headerId));
};

// Update a Header identified by the headerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  HeaderModule.updateById(req.params.headerId, new HeaderModule({...req.body, icon: req.files.icon}), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_header' with headerId " + req.params.headerId)
  );
};

// Delete a Header with the specified headerId in the request
exports.delete = (req, res) => {
  HeaderModule.remove(req.params.headerId, (err, data) => resCallback(res, err, data, "Could not delete 'module_header' with headerId " + req.params.headerId));
};

// Delete Headers from the database.
exports.deleteAll = (req, res) => {
  HeaderModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_header's."));
};