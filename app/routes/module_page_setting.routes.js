module.exports = app => {
  const pageSettingModule = require("../controllers/module_page_setting.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new Page Setting
    * 
    * @param {
    *   internalName: "***",
    *   maxWidth: "***",
    * }
  */
  app.post("/module_page_setting", multer().any(), pageSettingModule.create);

  /** 
    * @desc Retrieve Page Settings
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_page_setting", pageSettingModule.getAll);

  /** 
    * @desc Retrieve Page Settings Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_page_setting/length", pageSettingModule.getLength);


  /** 
    * @desc Retrieve a single Page Setting with pageSettingId
  */
  app.get("/module_page_setting/:pageSettingId", pageSettingModule.get);
  app.get("/module_page_setting/detail/:pageSettingId", pageSettingModule.get);


  /** 
    * @desc Update a Page Setting with pageSettingId
    * 
    * @param {
    *   internalName: "***",
    *   maxWidth: "***",
    * }
  */
  app.put("/module_page_setting/:pageSettingId", multer().any(), pageSettingModule.update);


  /** 
    * @desc Delete a Page Setting with pageSettingId
  */
  app.post("/module_page_setting/delete/:pageSettingId", pageSettingModule.delete);

  /** 
    * @desc Delete Page Settings
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_page_setting/delete", pageSettingModule.deleteAll);
};