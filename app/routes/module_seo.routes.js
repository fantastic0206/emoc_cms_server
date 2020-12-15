module.exports = app => {
  const seoModule = require("../controllers/module_seo.controller.js");
  var multer = require('multer');
  
  /** 
    * @desc Create a new SEO
    * 
    * @param {
    *   internalName: "***",
    *   slug: "***",
    *   featuredImage: {
    *     id: *
    *   }
    *   title: "***",
    *   description: "****"
    * }
  */
  app.post("/module_seo", multer().any(), seoModule.create);

  /** 
    * @desc Retrieve SEOs
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_seo", seoModule.getAll);

  /** 
    * @desc Retrieve SEOs Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_seo/length", seoModule.getLength);


  /** 
    * @desc Retrieve a single SEO with seoId
  */
  app.get("/module_seo/:seoId", seoModule.get);
  app.get("/module_seo/detail/:seoId", seoModule.getDetail);


  /** 
    * @desc Update a SEO with seoId
    * 
    * @param {
    *   internalName: "***",
    *   slug: "***",
    *   featuredImage: {
    *     id: *
    *   }
    *   title: "***",
    *   description: "****"
    * }
  */
  app.put("/module_seo/:seoId", multer().any(), seoModule.update);


  /** 
    * @desc Delete a SEO with seoId
  */
  app.post("/module_seo/delete/:seoId", seoModule.delete);

  /** 
    * @desc Delete SEOs
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_seo/delete", seoModule.deleteAll);
};