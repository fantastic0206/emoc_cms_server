const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const TitleDescriptionModule = function(titleDescription) {
  this.internalName = titleDescription.internalName;
  this.setting = CommonModel.customJsonParse(titleDescription.setting);
  this.title = titleDescription.title;
  this.subhead = titleDescription.subhead;
  this.description = titleDescription.description;
  this.ctaText = titleDescription.ctaText;
  this.ctaLink = titleDescription.ctaLink;
  this.align = titleDescription.align;
};

TitleDescriptionModule.create = async (newTitleDescription, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_title_description SET internalName = ?, settingId = ?, title = ?, subhead = ?, description = ?, ctaText = ?, ctaLink = ?, align = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newTitleDescription.internalName, newTitleDescription.setting ? newTitleDescription.setting.id : null, newTitleDescription.title, newTitleDescription.subhead, newTitleDescription.description, newTitleDescription.ctaText, newTitleDescription.ctaLink, newTitleDescription.align]
    );

    console.log("Created 'module_title_description': ", { titleDescriptionId: res.insertId, ...newTitleDescription });
    result(null, { titleDescriptionId: res.insertId, id: res.insertId, ...newTitleDescription });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

TitleDescriptionModule.getById = async (titleDescriptionId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_title_description WHERE titleDescriptionId = ${titleDescriptionId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const titleDescription = {
      ...res[0],
      setting: settingContent
    };
    
    console.log("Found 'module_title_description': ", titleDescription);
    result(null, titleDescription);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

TitleDescriptionModule.getDetailById = async (titleDescriptionId, result) => {
  try {
    const titleDescription = await this.getDetailContentById(titleDescriptionId);
    console.log("Found 'module_title_description': ", titleDescription);
    result(null, titleDescription);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

TitleDescriptionModule.getSimpleContentById = async (titleDescriptionId) => {
  if (titleDescriptionId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_title_description WHERE titleDescriptionId = ${titleDescriptionId}`);
      if (res.length > 0) {
        return {
          id: titleDescriptionId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

TitleDescriptionModule.getDetailContentById = async (titleDescriptionId) => {
  if (titleDescriptionId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_title_description WHERE titleDescriptionId = ${titleDescriptionId}`);
    
      if (res.length > 0) {
        const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
        const titleDescription = {
          ...res[0],
          setting: settingContent
        };
        return titleDescription;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

TitleDescriptionModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, titleDescriptionId as id FROM module_title_description ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_title_description': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

TitleDescriptionModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_title_description ${whereStr}`);
    console.log("'module_title_description' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

TitleDescriptionModule.updateById = async (titleDescriptionId, titleDescription, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_title_description SET internalName = ?, settingId = ?, title = ?, subhead = ?, description = ?, ctaText = ?, ctaLink = ?, align = ? WHERE titleDescriptionId = ?",
      [titleDescription.internalName, titleDescription.setting ? titleDescription.setting.id : null, titleDescription.title, titleDescription.subhead, titleDescription.description, titleDescription.ctaText, titleDescription.ctaLink, titleDescription.align, titleDescriptionId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Updated 'module_title_description': ", { titleDescriptionId: titleDescriptionId, ...titleDescription });
    result(null, { titleDescriptionId: titleDescriptionId, id: titleDescriptionId, ...titleDescription });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

TitleDescriptionModule.remove = async (titleDescriptionId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_title_description WHERE titleDescriptionId = ?", titleDescriptionId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_title_description' with 'titleDescriptionId': ", titleDescriptionId);
    result(null, { message: `'module_title_description' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

TitleDescriptionModule.removeAll = async (filter, titleDescriptionIds, result) => {
  try {
    if (!titleDescriptionIds) {
      titleDescriptionIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT titleDescriptionId FROM module_title_description ${whereStr}`);
        res.forEach(titleDescription => {
          titleDescriptionIds.push(titleDescription.titleDescriptionId);
        })
      }
    }
    
    let inStr = '';
    if (titleDescriptionIds.length > 0) {
      inStr = ` WHERE titleDescriptionId in (${titleDescriptionIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_title_description ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_title_description's`);
      console.log(`Deleted 'module_title_description' ids: ${titleDescriptionIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_title_description'`);
    }
    
    result(null, { message: `'module_title_description's were deleted successfully! Deleted ids: ${titleDescriptionIds.join(', ')}` });
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

    if (filter.title) {
      whereClause.push(`(title like '%${filter.title}%')`);
    }

    if (filter.subhead) {
      whereClause.push(`(description like '%${filter.subhead}%')`);
    }

    if (filter.description) {
      whereClause.push(`(description like '%${filter.description}%')`);
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

module.exports = TitleDescriptionModule;
