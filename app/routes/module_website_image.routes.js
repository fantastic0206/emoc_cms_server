module.exports = app => {
  const websiteImageModule = require("../controllers/module_website_image.controller.js");
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
  var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'imageMobile', maxCount: 1 }]);

  /** 
    * @desc Create a new Website Image
    * 
    * @param {
    *   internalName: "***",
    *   image: "***",
    *   imageMobile: "***",
    *   alt: "***",
    *   caption: "***",
    *   ctaLink: "***",
    *   border: "***"
    * }
  */
  app.post("/module_website_image", cpUpload, websiteImageModule.create);

  /** 
    * @desc Retrieve Website Images
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_website_image", websiteImageModule.getAll);

  /** 
    * @desc Retrieve Website Images Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_website_image/length", websiteImageModule.getLength);


  /** 
    * @desc Retrieve a single Website Image with websiteImageId
  */
  app.get("/module_website_image/:websiteImageId", websiteImageModule.get);
  app.get("/module_website_image/detail/:websiteImageId", websiteImageModule.get);

  /** 
    * @desc Update a Website Image with websiteImageId
    * 
    * @param {
    *   internalName: "***",
    *   image: "***",
    *   imageMobile: "***",
    *   alt: "***"
    *   caption: "***",
    *   ctaLink: "***",
    *   border: "***"
    * }
  */
  app.put("/module_website_image/:websiteImageId", cpUpload, websiteImageModule.update);
  

  /** 
    * @desc Delete a Website Image with websiteImageId
  */
  app.post("/module_website_image/delete/:websiteImageId", websiteImageModule.delete);

  /** 
    * @desc Delete Website Images
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_website_image/delete", websiteImageModule.deleteAll);
};