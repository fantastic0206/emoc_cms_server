module.exports = app => {
  const cardModule = require("../controllers/module_card.controller.js");
  var multer = require('multer');

  /** 
    * @desc Create a new Card
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
  app.post("/module_card", multer().any(), cardModule.create);

  /** 
    * @desc Retrieve Cards
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   paging: {number: 0, size: 10},
    *   sorting: {orderBy: "internalName", order: "DESC"}
    * }
  */
  app.get("/module_card", cardModule.getAll);

  /** 
    * @desc Retrieve Cards Count
    * 
    * @param {
    *   filter: {internalName: "**"}
    * }
  */
  app.get("/module_card/length", cardModule.getLength);


  /** 
    * @desc Retrieve a single Card with cardId
  */
  app.get("/module_card/:cardId", cardModule.get);
  app.get("/module_card/detail/:cardId", cardModule.getDetail);


  /** 
    * @desc Update a Card with cardId
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
  app.put("/module_card/:cardId", multer().any(), cardModule.update);


  /** 
    * @desc Delete a Card with cardId
  */
  app.post("/module_card/delete/:cardId", cardModule.delete);

  /** 
    * @desc Delete Cards
    * 
    * @param {
    *   filter: {internalName: "**"},
    *   ids: [*, *, *]
    * }
  */
  app.post("/module_card/delete", cardModule.deleteAll);
};