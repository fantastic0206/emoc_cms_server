module.exports = app => {
  const siteSettingModule = require("../controllers/module_site_setting.controller.js");
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
  var cpUpload = upload.fields([{ name: 'favicon', maxCount: 1 }]);

  /** 
    * @desc Create a new Card
    * 
    * @param {
    *   internalName: "***",
    *   siteName:  *,
    *   maxWidth: "***",
    *   favicon: "***",
    *   defaultLinkTextColor: "***",
    *   h1: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    *   h2: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    *   h3: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    *   h4: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    *   body1: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    *   body2: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    *   body3: {
    *     font: "***",
    *     fontSize: "***",
    *     fontColor: "***",
    *     fontFormat: "***",
    *     fontAlign: "***",
    *     lineHeight: "***",
    *     letterSpacing: "***",
    *   },
    * }
  */

  /** 
    * @desc Retrieve a single Card with cardId
  */
  app.get("/module_site_setting/:siteSettingId", siteSettingModule.get);
  app.put("/module_site_setting/:siteSettingId", cpUpload, siteSettingModule.update);
};