module.exports = app => {
  const headerModule = require("../controllers/module_header.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new Header
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
  app.post("/module_header", multer().any(), headerModule.create);

  /** 
    * @desc Retrieve Headers
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_header", headerModule.getAll);

  /** 
    * @desc Retrieve Headers Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_header/length", headerModule.getLength);


  /** 
    * @desc Retrieve a single Header with headerId
  */
  app.get("/module_header/:headerId", headerModule.get);
  app.get("/module_header/detail/:headerId", headerModule.getDetail);


  /** 
    * @desc Update a Header with headerId
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
  app.put("/module_header/:headerId", multer().any(), headerModule.update);


  /** 
    * @desc Delete a Header with headerId
  */
  app.post("/module_header/delete/:headerId", headerModule.delete);

  /** 
    * @desc Delete Headers
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_header/delete", headerModule.deleteAll);
};