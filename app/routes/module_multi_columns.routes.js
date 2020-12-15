module.exports = app => {
  const multiColumnsModule = require("../controllers/module_multi_columns.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new MultiColumns
    * 
    * @param {
    *   internalName: "***",
    *   setting: {
    *     id: *
    *   },
    *   columnCount: *,
    *   columnWidths: "*,*,*",
    *   columns: [
    *     {
    *       moduleName: "***",
    *       moduleId: *
    *     },
    *   ]
    * }
  */
  app.post("/module_multi_columns", multer().any(), multiColumnsModule.create);

  /** 
    * @desc Retrieve MultiColumnss
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_multi_columns", multiColumnsModule.getAll);

  /** 
    * @desc Retrieve MultiColumnss Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_multi_columns/length", multiColumnsModule.getLength);


  /** 
    * @desc Retrieve a single MultiColumns with multiColumnsId
  */
  app.get("/module_multi_columns/:multiColumnsId", multiColumnsModule.get);
  app.get("/module_multi_columns/detail/:multiColumnsId", multiColumnsModule.getDetail);


  /** 
    * @desc Update a MultiColumns with multiColumnsId
    * 
    * @param {
    *   internalName: "***",
    *   setting: {
    *     id: *
    *   },
    *   columnCount: *,
    *   columnWidths: "*,*,*",
    *   columns: [
    *     {
    *       moduleName: "***",
    *       moduleId: *
    *     },
    *   ]
    * }
  */
  app.put("/module_multi_columns/:multiColumnsId", multer().any(), multiColumnsModule.update);


  /** 
    * @desc Delete a MultiColumns with multiColumnsId
  */
  app.post("/module_multi_columns/delete/:multiColumnsId", multiColumnsModule.delete);

  /** 
    * @desc Delete MultiColumnss
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_multi_columns/delete", multiColumnsModule.deleteAll);
};