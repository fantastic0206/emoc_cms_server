module.exports = app => {
  const menuGroupModule = require("../controllers/module_menu_group.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new Menu Group
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
  app.post("/module_menu_group", multer().any(), menuGroupModule.create);

  /** 
    * @desc Retrieve Menu Groups
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_menu_group", menuGroupModule.getAll);

  /** 
    * @desc Retrieve Menu Groups Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_menu_group/length", menuGroupModule.getLength);


  /** 
    * @desc Retrieve a single Menu Group with menuGroupId
  */
  app.get("/module_menu_group/:menuGroupId", menuGroupModule.get);
  app.get("/module_menu_group/detail/:menuGroupId", menuGroupModule.getDetail);


  /** 
    * @desc Update a Menu Group with menuGroupId
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
  app.put("/module_menu_group/:menuGroupId", multer().any(), menuGroupModule.update);


  /** 
    * @desc Delete a Menu Group with menuGroupId
  */
  app.post("/module_menu_group/delete/:menuGroupId", menuGroupModule.delete);

  /** 
    * @desc Delete Menu Groups
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_menu_group/delete", menuGroupModule.deleteAll);
};