const CardModule = require("../models/module_card.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_card'`
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

// Create and Save a new Card
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Card in the database
  CardModule.create(new CardModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_card'."));
};

// Retrieve Cards from the database.
exports.getAll = (req, res) => {
  CardModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_card's.")
  );
};

// Retrieve Cards Length from the database.
exports.getLength = (req, res) => {
  CardModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_card' length."));
};

// Find a single Card with a cardId
exports.get = (req, res) => {
  CardModule.getById(req.params.cardId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_card' with cardId " + req.params.cardId));
};

// Find a single Card Detail with a cardId
exports.getDetail = (req, res) => {
  CardModule.getDetailById(req.params.cardId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_card' with cardId " + req.params.cardId));
};

// Update a Card identified by the cardId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  CardModule.updateById(req.params.cardId, new CardModule(req.body), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_card' with cardId " + req.params.cardId)
  );
};

// Delete a Card with the specified cardId in the request
exports.delete = (req, res) => {
  CardModule.remove(req.params.cardId, (err, data) => resCallback(res, err, data, "Could not delete 'module_card' with cardId " + req.params.cardId));
};

// Delete Cards from the database.
exports.deleteAll = (req, res) => {
  CardModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_card's."));
};