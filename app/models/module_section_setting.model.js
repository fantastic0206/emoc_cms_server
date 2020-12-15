const sql = require("./db.js");
const CommonModel = require("../models/common.model.js");

// constructor
const SectionSettingModule = function(sectionSetting) {
  this.internalName = sectionSetting.internalName;
  this.maxWidth = sectionSetting.maxWidth;
  this.width = sectionSetting.width;
  this.maxHeight = sectionSetting.maxHeight;
  this.height = sectionSetting.height;
  this.backgroundColor = sectionSetting.backgroundColor;
  this.backgroundImage = CommonModel.customJsonParse(sectionSetting.backgroundImage);
  this.borders = sectionSetting.borders;
  this.borderStyle = sectionSetting.borderStyle;
  this.borderThickness = sectionSetting.borderThickness;
  this.borderColor = sectionSetting.borderColor;
  // this.padding = sectionSetting.padding;
  // this.margin = sectionSetting.margin;
};

SectionSettingModule.create = async (newSectionSetting, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_section_setting SET internalName = ?, width = ?, maxWidth = ?, height = ?, maxHeight = ?, backgroundColor = ?, backgroundImageId = ?, borders = ?, borderStyle = ?, borderThickness = ?, borderColor = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newSectionSetting.internalName, newSectionSetting.width, newSectionSetting.maxWidth, newSectionSetting.height, newSectionSetting.maxHeight, newSectionSetting.backgroundColor, newSectionSetting.backgroundImage ? newSectionSetting.backgroundImage.id : null, newSectionSetting.borders, newSectionSetting.borderStyle, newSectionSetting.borderThickness, newSectionSetting.borderColor]
    );

    console.log("Created 'module_section_setting': ", { sectionSettingId: res.insertId, ...newSectionSetting });
    result(null, { sectionSettingId: res.insertId, id: res.insertId, ...newSectionSetting });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

SectionSettingModule.getById = async (sectionSettingId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_section_setting WHERE sectionSettingId = ${sectionSettingId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const backgroundImageContent = await CommonModel.getSimpleContentById('module_website_image', res[0].backgroundImageId);
    const sectionSetting = {
      ...res[0],
      backgroundImage: backgroundImageContent
    };
    
    console.log("Found 'module_section_setting': ", sectionSetting);
    result(null, sectionSetting);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SectionSettingModule.getDetailById = async (sectionSettingId, result) => {
  try {
    const sectionSetting = await this.getDetailContentById(sectionSettingId);
    console.log("Found 'module_section_setting': ", sectionSetting);
    result(null, sectionSetting);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SectionSettingModule.getSimpleContentById = async (sectionSettingId) => {
  if (sectionSettingId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_section_setting WHERE sectionSettingId = ${sectionSettingId}`);
      if (res.length > 0) {
        return {
          id: sectionSettingId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

SectionSettingModule.getDetailContentById = async (sectionSettingId) => {
  if (sectionSettingId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_section_setting WHERE sectionSettingId = ${sectionSettingId}`);
    
      if (res.length > 0) {
        const backgroundImageContent = await CommonModel.getDetailContentById('module_website_image', res[0].backgroundImageId);
        const sectionSetting = {
          ...res[0],
          backgroundImage: backgroundImageContent
        };
        return sectionSetting;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

SectionSettingModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, sectionSettingId as id FROM module_section_setting ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_section_setting': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

SectionSettingModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_section_setting ${whereStr}`);
    console.log("'module_section_setting' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

SectionSettingModule.updateById = async (sectionSettingId, sectionSetting, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_section_setting SET internalName = ?, width = ?, maxWidth = ?, height = ?, maxHeight = ?, backgroundColor = ?, backgroundImageId = ?, borders = ?, borderStyle = ?, borderThickness = ?, borderColor = ? WHERE sectionSettingId = ?",
      [sectionSetting.internalName, sectionSetting.width, sectionSetting.maxWidth, sectionSetting.height, sectionSetting.maxHeight, sectionSetting.backgroundColor, sectionSetting.backgroundImage ? sectionSetting.backgroundImage.id : null, sectionSetting.borders, sectionSetting.borderStyle, sectionSetting.borderThickness, sectionSetting.borderColor, sectionSettingId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Updated 'module_section_setting': ", { sectionSettingId: sectionSettingId, ...sectionSetting });
    result(null, { sectionSettingId: sectionSettingId, id: sectionSettingId, ...sectionSetting });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SectionSettingModule.remove = async (sectionSettingId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_section_setting WHERE sectionSettingId = ?", sectionSettingId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_section_setting' with 'sectionSettingId': ", sectionSettingId);
    result(null, { message: `'module_section_setting' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SectionSettingModule.removeAll = async (filter, sectionSettingIds, result) => {
  try {
    if (!sectionSettingIds) {
      sectionSettingIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT sectionSettingId FROM module_section_setting ${whereStr}`);
        res.forEach(sectionSetting => {
          sectionSettingIds.push(sectionSetting.sectionSettingId);
        })
      }
    }
    
    let inStr = '';
    if (sectionSettingIds.length > 0) {
      inStr = ` WHERE sectionSettingId in (${sectionSettingIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_section_setting ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_section_setting's`);
      console.log(`Deleted 'module_section_setting' ids: ${sectionSettingIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_section_setting'`);
    }
    
    result(null, { message: `'module_section_setting's were deleted successfully! Deleted ids: ${sectionSettingIds.join(', ')}` });
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

module.exports = SectionSettingModule;
