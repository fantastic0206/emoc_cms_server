module.exports = app => {
  const titleDescriptionModule = require("../controllers/module_title_description.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new TitleDescription
    * 
    * @param {
    *   internalName: "***",
    *   setting: {
    *     id: *
    *   },
    *   title: "***",
    *   subhead: "***",
    *   description: "***",
    *   ctaText: "***",
    *   ctaLink: "***",
    *   align: "***"
    * }
  */
  app.post("/module_title_description", multer().any(), titleDescriptionModule.create);

  /** 
    * @desc Retrieve TitleDescriptions
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_title_description", titleDescriptionModule.getAll);

  /** 
    * @desc Retrieve TitleDescriptions Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_title_description/length", titleDescriptionModule.getLength);


  /** 
    * @desc Retrieve a single TitleDescription with titleDescriptionId
  */
  app.get("/module_title_description/:titleDescriptionId", titleDescriptionModule.get);
  app.get("/module_title_description/detail/:titleDescriptionId", titleDescriptionModule.getDetail);


  /** 
    * @desc Update a TitleDescription with titleDescriptionId
    * 
    * @param {
    *   internalName: "***",
    *   setting: {
    *     id: *
    *   },
    *   title: "***",
    *   subhead: "***",
    *   description: "***",
    *   ctaText: "***",
    *   ctaLink: "***",
    *   align: "***"
    * }
  */
  app.put("/module_title_description/:titleDescriptionId", multer().any(), titleDescriptionModule.update);


  /** 
    * @desc Delete a TitleDescription with titleDescriptionId
  */
  app.post("/module_title_description/delete/:titleDescriptionId", titleDescriptionModule.delete);

  /** 
    * @desc Delete TitleDescriptions
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_title_description/delete", titleDescriptionModule.deleteAll);
};