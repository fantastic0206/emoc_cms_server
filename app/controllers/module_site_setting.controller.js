const SiteSettingModule = require("../models/module_site_setting.model.js");

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

// Find a single Page Setting with a pageSettingId
exports.get = (req, res) => {
  SiteSettingModule.getById(req.params.siteSettingId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_site_setting' with siteSettingId " + req.params.siteSettingId));
};
// Update a Page Setting identified by the pageSettingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  SiteSettingModule.updateById(req.params.siteSettingId, new SiteSettingModule({
    ...req.body,
    favicon: req.files.favicon,
  }), 
    (err, data) => resCallback(res, err, data, "Error updating 'module_site_setting' with siteSettingId " + req.params.siteSettingId)
  );
};
