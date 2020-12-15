module.exports = app => {
  const pages = require("../controllers/page.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new Page
    * 
    * @param {
    *   internalName: "***",
    *   seo: {
    *     id: *,
    *   }
    *   pageSetting: {
    *     id: *,
    *   }
    *   modules: [
    *     {
    *       moduleName: "***",
    *       moduleId: *
    *     },
    *   ]
    * }
  */
  app.post("/pages", multer().any(), pages.create);

  /** 
    * @desc Retrieve Pages
    * 
    * @param { 
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/pages", pages.getAll);
  app.get("/pages/slugs", pages.getAllSlugs);

  /** 
    * @desc Retrieve Pages Count
    * 
    * @param { 
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/pages/length", pages.getLength);


  /** 
    * @desc Retrieve a single Page with pageId
  */
 app.post("/pages/detail/slug", pages.getDetailBySlug);
 app.get("/pages/detail/:pageId", pages.getDetail);
 app.get("/pages/:pageId", pages.get);
  

  /** 
    * @desc Update a Page with pageId
    * 
    * @param {
    *   internalName: "***",
    *   seo: {
    *     id: *,
    *   },
    *   pageSetting: {
    *     id: *,
    *   },
    *   modules: [
    *     {
    *       moduleName: "***",
    *       moduleId: *
    *     },
    *   ]
    * }
  */
  app.put("/pages/:pageId", multer().any(), pages.update);


  /** 
    * @desc Delete a Page with pageId
  */
  app.post("/pages/delete/:pageId", pages.delete);

  /** 
    * @desc Delete Pages
    * 
    * @param { 
    *   filter: {internalName: "**"},
    *   ids: [*, *, *] 
    * }
  */
  app.post("/pages/delete", pages.deleteAll);
};