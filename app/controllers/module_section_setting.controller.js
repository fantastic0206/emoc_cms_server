const SectionSettingModule = require("../models/module_section_setting.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_section_setting'`
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

// Create and Save a new Section Setting
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Section Setting in the database
  SectionSettingModule.create(new SectionSettingModule(req.body), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_section_setting'."));
};

// Retrieve Section Settings from the database.
exports.getAll = (req, res) => {
  SectionSettingModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_section_setting's.")
  );
};

// Retrieve Section Settings Length from the database.
exports.getLength = (req, res) => {
  SectionSettingModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_section_setting' length."));
};

// Find a single Section Setting with a sectionSettingId
exports.get = (req, res) => {
  SectionSettingModule.getById(req.params.sectionSettingId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_section_setting' with sectionSettingId " + req.params.sectionSettingId));
};

// Find a single Section Setting Detail with a sectionSettingId
exports.getDetail = (req, res) => {
  SectionSettingModule.getDetailById(req.params.sectionSettingId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_section_setting' with sectionSettingId " + req.params.sectionSettingId));
};

// Update a Section Setting identified by the sectionSettingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  SectionSettingModule.updateById(req.params.sectionSettingId, new SectionSettingModule(req.body), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_section_setting' with sectionSettingId " + req.params.sectionSettingId)
  );
};

// Delete a Section Setting with the specified sectionSettingId in the request
exports.delete = (req, res) => {
  SectionSettingModule.remove(req.params.sectionSettingId, (err, data) => resCallback(res, err, data, "Could not delete 'module_section_setting' with sectionSettingId " + req.params.sectionSettingId));
};

// Delete Section Settings from the database.
exports.deleteAll = (req, res) => {
  SectionSettingModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_section_setting's."));
};