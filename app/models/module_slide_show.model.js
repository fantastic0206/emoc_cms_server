const sql = require("./db.js");
const CommonModel = require("./common.model.js");

const SlideShowModule = function(slideshow) {
    this.internalName = slideshow.internalName;
    this.slideType = slideshow.slideType;
    this.padding = slideshow.padding;
    this.toggleButton = slideshow.toggleButton;
    this.transitionEffect = slideshow.transitionEffect;
    this.pagenationIcons = slideshow.icon;
    this.images = slideshow.image;
    this.existImg = slideshow.existImg;
    this.imageRemove = slideshow.imageRemove;
}
SlideShowModule.create = async (newSlideShowModule, result) => {
    try {
      const [res, fields] = await sql.promise().query(
        "INSERT INTO module_slide_show SET internalName = ?, toggleButton = ?, slideType = ?, padding = ?, transitionEffect = ?, icon=?, createdAt = NOW(), updatedAt = NOW()", 
        [newSlideShowModule.internalName, newSlideShowModule.toggleButton, newSlideShowModule.slideType, newSlideShowModule.padding, newSlideShowModule.transitionEffect, newSlideShowModule.pagenationIcons]
      );
        var imgNamesimgNamesimgNamesimgNames = "";
      if(newSlideShowModule.images) {
        for(var i = 0 ;i < newSlideShowModule.images.length; i++) {
          imgNames += (i === newSlideShowModule.images.length -1 ? newSlideShowModule.images[i].filename : (newSlideShowModule.images[i].filename + ","));
        }
      }
      if (newSlideShowModule.images) {
        const [res1, fields1] = await sql.promise().query(
          "UPDATE module_slide_show SET multiimage = ? WHERE slideShowId = ?",
          [newSlideShowModule.images ? imgNames : null, res.insertId]
        );
      }
      
      // if (newSlideShowModule.pagenationIcons) {
      //   const [res1, fields1] = await sql.promise().query(
      //     "UPDATE module_slide_show SET icon = ? WHERE slideShowId = ?",
      //     [newSlideShowModule.pagenationIcons ? newSlideShowModule.pagenationIcons[0].filename : null, res.insertId]
      //   );
      // }
      console.log("created 'module_slide_show': ");
      result(null, { websiteImageId: res.insertId, id: res.insertId, ...newSlideShowModule });

    } catch (err) {
      console.log("error: ", err);
      result(err, null);
    };
  };
SlideShowModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, slideShowId as id FROM module_slide_show ${whereStr} ${orderStr} ${pagingStr}`);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

SlideShowModule.getDetailContentById = async (slideShowId) => {
  if (slideShowId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_slide_show WHERE slideShowId = ${slideShowId}`);
    
      if (res.length > 0) {
        // const slideShowContent = await CommonModel.getDetailContentById('module_website_image', res[0].featuredImageId);
        // const slide = {
        //   ...res[0],
        //   featuredImage: featuredImageContent
        // };
        const slideshowdata = res[0];
        console.log("++++++res=======", slideshowdata);
        return slideshowdata;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

SlideShowModule.getById = async (slideShowId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_slide_show WHERE slideShowId = ${slideShowId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }
    // const [res1, fields1] = await sql.promise().query(`SELECT * FROM module_slide_show WHERE slideShowId = ${slideShowId}`);
    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const columns = [];
    
    const moduleContent = await CommonModel.getSimpleContentById(res[0].moduleName, res[0].moduleId);

    const SLIDESHOW = {
      ...res[0],
      setting: moduleContent,
    };

    result(null, SLIDESHOW);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SlideShowModule.updateById = async (slideShowId, slideshow, result) => {
  console.log("<>", slideshow)
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_slide_show SET internalName = ?, toggleButton = ?, slideType = ?, padding = ?, transitionEffect = ?, icon = ? WHERE slideShowId = ?",
      [slideshow.internalName, slideshow.toggleButton , slideshow.slideType , slideshow.padding, slideshow.transitionEffect, slideshow.pagenationIcons, slideShowId]
    );
    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }
    var imgNames = "";
    if(slideshow.images) {
      for(var i = 0 ;i < slideshow.images.length; i++) {
        imgNames += (i === slideshow.images.length -1 ? slideshow.images[i].filename : (slideshow.images[i].filename + ","));
      }
    }
      var imageNames = "";
    if(imgNames && slideshow.existImg) {
      imageNames = imgNames + "," + slideshow.existImg;
    } else if(imgNames && !slideshow.existImg) imageNames = imgNames;
    else if(!imgNames && slideshow.existImg) imageNames = slideshow.existImg;
    else imageNames = "";
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_slide_show SET multiimage = ? WHERE slideShowId = ?",
        // [slideshow.images ? `${imgNames},${slideshow.existImg}` : slideshow.existImg, slideShowId]
        [imageNames, slideShowId]
      );  
    // if(slideshow.pagenationIcons) {
    //   const [res1, fields1] = await sql.promise().query(
    //     "UPDATE module_slide_show SET icon = ? WHERE slideShowId = ?",
    //     [slideshow.pagenationIcons ? slideshow.pagenationIcons[0].filename : null, slideShowId]
    //   );  
    // }
    if (slideshow.imageRemove === 'true') {
      await sql.promise().query(
        "UPDATE module_slide_show SET icon = ? WHERE slideShowId = ?",
        [null, slideShowId]
      );
    }
    console.log("Updated 'module_slide_show': ", { slideShowId: slideShowId, ...slideshow });
    result(null, { slideShowId: slideShowId, id: slideShowId, ...slideshow });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SlideShowModule.remove = async (slideShowId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_slide_show WHERE slideShowId = ?", slideShowId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM module_slide_show WHERE slideShowId = ?", slideShowId);

    console.log("Deleted 'module_slide_show' with 'slideShowId': ", slideShowId);
    result(null, { message: `'module_slide_show' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};
SlideShowModule.getSimpleContentById = async (moduleId) => {
  if (moduleId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_slide_show WHERE slideShowId = ${moduleId}`);
      if (res.length > 0) {
        return {
          id: moduleId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};
SlideShowModule.removeAll = async (filter, slideShowIds, result) => {
  try {
    if (!slideShowIds) {
      slideShowIds = [];
    }
    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);
      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT slideShowId FROM module_slide_show ${whereStr}`);
        res.forEach(slideShows => {
          slideShowIds.push(slideShowId.slideShowId);
        })
      }
    }
    
    let inStr = '';
    if (slideShowIds.length > 0) {
      inStr = ` WHERE slideShowId in (${slideShowIds.join(', ')}) `;
    }

    if (inStr !== '') {
      await sql.promise().query(`DELETE FROM module_slide_show ${inStr}`);
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_slide_show ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_slide_show's`);
      console.log('Deleted module_slide_show ids: ', slideShowIds.join(', '));
    } else {
      console.log(`Deleted 0 'module_slide_show'`);
    }
    result(null, { message: `'module_slide_show's were deleted successfully! Deleted ids: ${slideShowIds.join(', ')}` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};


const getWhereOrderLimitStr = (filter, sorting = null, paging = null) => {
  const whereClause = [];
  if (filter) {
    if (filter.internalName) {
      whereClause.push(`(internalName like '%${filter.internalName}%')`);
    }
  }

  const whereStr = (whereClause.length > 0 ? 'WHERE ' : '') + whereClause.join(' AND ');

  let orderStr = "ORDER BY ";
  if (sorting) {
    orderStr += `${sorting.orderBy} ${sorting.order}`;
  } else {
    orderStr += `updatedAt DESC`;
  }

  let pagingStr = '';
  if (paging) {
    pagingStr = `LIMIT ${paging.number ? (paging.number * paging.size) + ',' : ''} ${paging.size}`;
  }

   return {whereStr, orderStr, pagingStr};
  };
  module.exports = SlideShowModule;