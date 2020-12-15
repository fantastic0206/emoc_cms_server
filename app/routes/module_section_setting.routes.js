module.exports = app => {
  const sectionSettingModule = require("../controllers/module_section_setting.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new Section Setting
    * 
    * @param {
    *   internalName: "***",
    *   maxWidth: "***",
    *   backgroundColor: "***",
    *   backgroundImage: {
    *     id: *
    *   },
    *   border: "***",
    * }
  */
  app.post("/module_section_setting", multer().any(), sectionSettingModule.create);

  /** 
    * @desc Retrieve Section Settings
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_section_setting", sectionSettingModule.getAll);

  /** 
    * @desc Retrieve Section Settings Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_section_setting/length", sectionSettingModule.getLength);


  /** 
    * @desc Retrieve a single Section Setting with sectionSettingId
  */
  app.get("/module_section_setting/:sectionSettingId", sectionSettingModule.get);
  app.get("/module_section_setting/detail/:sectionSettingId", sectionSettingModule.getDetail);


  /** 
    * @desc Update a Section Setting with sectionSettingId
    * 
    * @param {
    *   internalName: "***",
    *   maxWidth: "***",
    *   backgroundColor: "***",
    *   backgroundImage: {
    *     id: *
    *   },
    *   border: "***",
    * }
  */
  app.put("/module_section_setting/:sectionSettingId", multer().any(), sectionSettingModule.update);


  /** 
    * @desc Delete a Section Setting with sectionSettingId
  */
  app.post("/module_section_setting/delete/:sectionSettingId", sectionSettingModule.delete);

  /** 
    * @desc Delete Section Settings
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_section_setting/delete", sectionSettingModule.deleteAll);
};