const PageSettingModule = require("../models/module_page_setting.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_page_setting'`
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

// Create and Save a new Page Setting
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Page Setting in the database
  PageSettingModule.create(new PageSettingModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_page_setting'."));
};

// Retrieve Page Settings from the database.
exports.getAll = (req, res) => {
  PageSettingModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_page_setting's.")
  );
};

// Retrieve Page Settings Length from the database.
exports.getLength = (req, res) => {
  PageSettingModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_page_setting' length."));
};

// Find a single Page Setting with a pageSettingId
exports.get = (req, res) => {
  PageSettingModule.getById(req.params.pageSettingId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_page_setting' with pageSettingId " + req.params.pageSettingId));
};

// Update a Page Setting identified by the pageSettingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  PageSettingModule.updateById(req.params.pageSettingId, new PageSettingModule(req.body), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_page_setting' with pageSettingId " + req.params.pageSettingId)
  );
};

// Delete a Page Setting with the specified pageSettingId in the request
exports.delete = (req, res) => {
  PageSettingModule.remove(req.params.pageSettingId, (err, data) => resCallback(res, err, data, "Could not delete 'module_page_setting' with pageSettingId " + req.params.pageSettingId));
};

// Delete Page Settings from the database.
exports.deleteAll = (req, res) => {
  PageSettingModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_page_setting's."));
};