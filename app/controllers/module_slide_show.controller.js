
const SlideShowModule = require("../models/module_slide_show.model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'module_slide_show'`
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
exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  SlideShowModule.create(new SlideShowModule({
    internalName: req.body.internalName,
    slideType: req.body.slideType,
    padding: req.body.padding,
    toggleButton: req.body.toggleButton,
    transitionEffect: req.body.transitionEffect,
    // icon: req.files.icon,
    icon: req.body.pagenationIcon,
    image: req.files.multiimage

  }), (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'module_slide_show'."));
}
exports.getAll = (req, res) => {

  SlideShowModule.getAll(req.body.filter, req.body.sorting, req.body.paging,
    (err, data) => resCallback(res, err, data, "Some error occurred while retrieving 'module_slide_show's.")
  );
};
// Find a single SlideShow with a SlideShowId
exports.get = (req, res) => {

  SlideShowModule.getById(req.params.slideShowId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_slide_show' with slideShowId " + req.params.slideShowId));
};

// Find a single SlideShow Detail with a SlideShowId
exports.getDetail = (req, res) => {
  SlideShowModule.getDetailById(req.params.slideShowId, (err, data) => resCallback(res, err, data, "Error retrieving 'module_slide_show' with slideShowId " + req.params.slideShowId));
};

// Update a SlideShow identified by the SlideShowId in the request

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  SlideShowModule.updateById(req.params.slideShowId, new SlideShowModule(
    {
      internalName: req.body.internalName,
      slideType: req.body.slideType,
      padding: req.body.padding,
      toggleButton: req.body.toggleButton,
      transitionEffect: req.body.transitionEffect,
      // icon: req.files.icon,
      icon: req.body.pagenationIcon,
      image: req.files.multiimage,
      existImg: req.body.existImg,
      imageRemove: req.body.iconRemove,
    }
  ),
    (err, data) => resCallback(res, err, data, "Error updating 'module_slide_show' with slideShowId " + req.params.slideShowId)
  );
};
// Delete a MultiColumns with the specified multiColumnsId in the request

exports.delete = (req, res) => {
  SlideShowModule.remove(req.params.slideShowId, (err, data) => resCallback(res, err, data, "Could not delete 'module_slide_show' with slideShowId " + req.params.slideShowId));
};
// Delete MultiColumnss from the database.
exports.deleteAll = (req, res) => {
  SlideShowModule.removeAll(req.body.filter, req.body.ids, (err, data) => resCallback(res, err, data, "Some error occurred while removing 'module_slide_show's."));
};
