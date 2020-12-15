const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const WebsiteImageModule = function(websiteImage) {
  this.internalName = websiteImage.internalName;
  this.setting = CommonModel.customJsonParse(websiteImage.setting);
  this.image = websiteImage.image;
  this.imageMobile = websiteImage.imageMobile;
  this.alt = websiteImage.alt;
  this.caption = websiteImage.caption;
  this.ctaLink = websiteImage.ctaLink;
  this.borders = websiteImage.borders;
  this.borderStyle = websiteImage.borderStyle;
  this.borderThickness = websiteImage.borderThickness;
  this.borderColor = websiteImage.borderColor;
  this.imageRemove = websiteImage.imageRemove;
  this.imageMobileRemove = websiteImage.imageMobileRemove;
};

WebsiteImageModule.create = async (newWebsiteImage, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_website_image SET internalName = ?, alt = ?, caption = ?, ctaLink = ?, border = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newWebsiteImage.internalName, newWebsiteImage.alt, newWebsiteImage.caption, newWebsiteImage.ctaLink, newWebsiteImage.borders]
    );

    if (newWebsiteImage.image) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_website_image SET image = ? WHERE websiteImageId = ?",
        [newWebsiteImage.image ? newWebsiteImage.image[0].filename : null, res.insertId]
      );
    }
    
    if (newWebsiteImage.imageMobile) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_website_image SET imageMobile = ? WHERE websiteImageId = ?",
        [newWebsiteImage.imageMobile ? newWebsiteImage.imageMobile[0].filename : null, res.insertId]
      );
    }

    console.log("Created 'module_website_image': ", { websiteImageId: res.insertId, ...newWebsiteImage });
    result(null, { websiteImageId: res.insertId, id: res.insertId, ...newWebsiteImage });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

WebsiteImageModule.getById = async (websiteImageId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_website_image WHERE websiteImageId = ${websiteImageId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const websiteImage = {
      ...res[0],
      setting: settingContent,
    };
    
    console.log("Found 'module_website_image': ", websiteImage);
    result(null, websiteImage);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

WebsiteImageModule.getSimpleContentById = async (websiteImageId) => {
  if (websiteImageId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_website_image WHERE websiteImageId = ${websiteImageId}`);
      if (res.length > 0) {
        return {
          id: websiteImageId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

WebsiteImageModule.getDetailContentById = async (websiteImageId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_website_image WHERE websiteImageId = ${websiteImageId}`);

    if (res.length > 0) {
      const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
      const websiteImage = {
        ...res[0],
        setting: settingContent,
      };
      return websiteImage;
    }
  } catch (err) {
    return null;
  }
  return null;
};

WebsiteImageModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, websiteImageId as id FROM module_website_image ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_website_image': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

WebsiteImageModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_website_image ${whereStr}`);
    console.log("'module_website_image' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

WebsiteImageModule.updateById = async (websiteImageId, websiteImage, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_website_image SET internalName = ?, settingId = ?, alt = ?, caption = ?, ctaLink = ?, borders = ?, borderStyle = ?, borderThickness = ?, borderColor = ? WHERE websiteImageId = ?",
      [websiteImage.internalName, websiteImage.setting ? websiteImage.setting.id : null, websiteImage.alt, websiteImage.caption, websiteImage.ctaLink, websiteImage.borders, websiteImage.borderStyle, websiteImage.borderThickness, websiteImage.borderColor, websiteImageId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }
    if (websiteImage.imageRemove === 'true') {
      await sql.promise().query(
        "UPDATE module_website_image SET image = ? WHERE websiteImageId = ?",
        [null, websiteImageId]
      );
    }
    else if (websiteImage.image) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_website_image SET image = ? WHERE websiteImageId = ?",
        [websiteImage.image ? websiteImage.image[0].filename : null, websiteImageId]
      );
    }
    
    if (websiteImage.imageMobileRemove === 'true') {
      await sql.promise().query(
        "UPDATE module_website_image SET imageMobile = ? WHERE websiteImageId = ?",
        [null, websiteImageId]
      );
    }
    else if (websiteImage.imageMobile) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_website_image SET imageMobile = ? WHERE websiteImageId = ?",
        [websiteImage.imageMobile ? websiteImage.imageMobile[0].filename : null, websiteImageId]
      );
    }

    console.log("Updated 'module_website_image': ", { websiteImageId: websiteImageId, ...websiteImage });
    result(null, { websiteImageId: websiteImageId, id: websiteImageId, ...websiteImage });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

WebsiteImageModule.remove = async (websiteImageId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_website_image WHERE websiteImageId = ?", websiteImageId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_website_image' with 'websiteImageId': ", websiteImageId);
    result(null, { message: `'module_website_image' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

WebsiteImageModule.removeAll = async (filter, websiteImageIds, result) => {
  try {
    if (!websiteImageIds) {
      websiteImageIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT websiteImageId FROM module_website_image ${whereStr}`);
        res.forEach(websiteImage => {
          websiteImageIds.push(websiteImage.websiteImageId);
        })
      }
    }
    
    let inStr = '';
    if (websiteImageIds.length > 0) {
      inStr = ` WHERE websiteImageId in (${websiteImageIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_website_image ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_website_image's`);
      console.log(`Deleted 'module_website_image' ids: ${websiteImageIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_website_image'`);
    }
    
    result(null, { message: `'module_website_image's were deleted successfully! Deleted ids: ${websiteImageIds.join(', ')}` });
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

module.exports = WebsiteImageModule;
