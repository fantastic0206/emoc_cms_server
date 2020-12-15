module.exports = app => {
  const buttonModule = require("../controllers/module_button.controller.js");
  var multer = require('multer');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload');
    },
    filename: function (req, file, cb) {
      cb(null, `website-image--${Date.now()}.${file.originalname.split('.').pop()}`);
    }
  });

  var upload = multer({ storage: storage });
  var cpUpload = upload.fields([{ name: 'icon', maxCount: 1 }]);

  /** 
    * @desc Create a new Button
    * 
    * @param {
    *   internalName: "***",
    *   setting: {
    *     id: *
    *   },
    *   type: "***",
    *   coverImage: {
    *     id: *
    *   },
    *   title: "***",
    *   subhead: "***",
    *   description: "***",
    *   ctaText: "***",
    *   ctaLink: "***",
    * }
  */
  app.post("/module_button", cpUpload, buttonModule.create);

  /** 
    * @desc Retrieve Buttons
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_button", buttonModule.getAll);

  /** 
    * @desc Retrieve Buttons Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_button/length", buttonModule.getLength);


  /** 
    * @desc Retrieve a single Button with buttonId
  */
  app.get("/module_button/:buttonId", buttonModule.get);
  app.get("/module_button/detail/:buttonId", buttonModule.getDetail);


  /** 
    * @desc Update a Button with buttonId
    * 
    * @param {
    *   internalName: "***",
    *   setting: {
    *     id: *
    *   },
    *   type: "***",
    *   coverImage: {
    *     id: *
    *   },
    *   iconRemove: true,
    *   title: "***",
    *   subhead: "***",
    *   description: "***",
    *   ctaText: "***",
    *   ctaLink: "***",
    * }
  */
  app.put("/module_button/:buttonId", cpUpload, buttonModule.update);


  /** 
    * @desc Delete a Button with buttonId
  */
  app.post("/module_button/delete/:buttonId", buttonModule.delete);

  /** 
    * @desc Delete Buttons
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_button/delete", buttonModule.deleteAll);
};