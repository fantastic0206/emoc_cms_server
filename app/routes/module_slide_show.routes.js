module.exports = app => {
    const slideshowModule = require("../controllers/module_slide_show.controller.js");
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'upload');
        },
        filename: function (req, file, cb) {
          cb(null, `slide-show-image--${Date.now()}.${file.originalname.split('.').pop()}`);
        }
      });
    
      var upload = multer({ storage: storage });
      var cpUpload = upload.fields([{ name: "icon", maxCount: 1}, { name: "multiimage", maxCount: 50}]);
    

    //  create a new slideshow
    app.post("/module_slide_show", cpUpload, slideshowModule.create);
    
    //Retrieve slideshow

    app.get("/module_slide_show", slideshowModule.getAll);

    //Retrieve a single slideshow with slideshowId

    app.get("/module_slide_show/:slideShowId", slideshowModule.get);
    // app.get("/slideshow/detail/:slideShowId", slideshowModule.getDetail);

    // Update a slideshow with slideshowId
    
    app.put("/module_slide_show/:slideShowId", cpUpload, slideshowModule.update);

    // Delete a slideshow with slideshowId

    app.post("/module_slide_show/delete/:slideShowId", slideshowModule.delete);
   
    // Delete All MultiColumnss
   
    app.post("/module_slide_show/delete", slideshowModule.deleteAll);


   

}