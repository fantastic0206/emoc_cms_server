const WebsiteImageModule = require("../models/module_website_image.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_website_image'`
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

// Create and Save a new Website Image
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Website Image in the database
  WebsiteImageModule.create(new WebsiteImageModule({
    internalName: req.body.internalName,
    setting: req.body.setting,
    image: req.files.image,
    imageMobile: req.files.imageMobile, 
    alt: req.body.alt,
    caption: req.body.caption,
    ctaLink: req.body.ctaLink,
    borders: req.body.borders,
    borderStyle: req.body.borderStyle,
    borderThickness: req.body.borderThickness,
    borderColor: req.body.borderColor,
  }), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_website_image'."));
};

// Retrieve Website Images from the database.
exports.getAll = (req, res) => {
  WebsiteImageModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_website_image's.")
  );
};

// Retrieve Website Images Length from the database.
exports.getLength = (req, res) => {
  WebsiteImageModule.getLength(req.body.filter, (err, data) =>  resCallback(res, err, data, "Some error occurred while retrieving 'module_website_image' length."));
};

// Find a single Website Image with a websiteImageId
exports.get = (req, res) => {
  WebsiteImageModule.getById(req.params.websiteImageId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_website_image' with websiteImageId " + req.params.websiteImageId));
};

// Update a Website Image identified by the websiteImageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  WebsiteImageModule.updateById(req.params.websiteImageId, new WebsiteImageModule({
      internalName: req.body.internalName,
      setting: req.body.setting,
      image: req.files.image,
      imageMobile: req.files.imageMobile, 
      alt: req.body.alt,
      caption: req.body.caption,
      ctaLink: req.body.ctaLink,
      borders: req.body.borders,
      borderStyle: req.body.borderStyle,
      borderThickness: req.body.borderThickness,
      borderColor: req.body.borderColor,
      imageRemove: req.body.imageRemove,
      imageMobileRemove: req.body.imageMobileRemove,
    }),
    (err, data) => resCallback(res, err, data, "Error updating 'module_website_image' with websiteImageId " + req.params.websiteImageId)
  );
};

// Delete a Website Image with the specified websiteImageId in the request
exports.delete = (req, res) => {
  WebsiteImageModule.remove(req.params.websiteImageId, (err, data) => resCallback(res, err, data, "Could not delete 'module_website_image' with websiteImageId " + req.params.websiteImageId));
};

// Delete Website Images from the database.
exports.deleteAll = (req, res) => {
  WebsiteImageModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_website_image's."));
};