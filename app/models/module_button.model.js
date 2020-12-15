const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const ButtonModule = function(button) {
  this.internalName = button.internalName;
  this.setting = CommonModel.customJsonParse(button.setting);
  this.type = button.type;
  this.icon = button.icon;
  this.size = button.size;
  this.iconAlign = button.iconAlign;
  this.fillColor = button.fillColor;
  this.hoverColor = button.hoverColor;
  this.title = button.title;
  this.ctaLink = button.ctaLink;
  this.linkColor = button.linkColor;
  this.linkHoverColor = button.linkHoverColor;
  this.textAlign = button.textAlign;
  this.radius = button.radius;
  this.iconRemove = button.iconRemove;
};

ButtonModule.create = async (newButton, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_button SET internalName = ?, settingId = ?, type = ?, size = ?, iconAlign = ?, fillColor = ?, hoverColor = ?, title = ?, ctaLink = ?, linkColor = ?, linkHoverColor = ?, textAlign = ?, radius = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newButton.internalName, newButton.setting ? newButton.setting.id : null, newButton.type, newButton.size, newButton.iconAlign, newButton.fillColor, newButton.hoverColor, newButton.title, newButton.ctaLink, newButton.linkColor, newButton.linkHoverColor, newButton.textAlign, newButton.radius]
    );

    if (newButton.icon) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_button SET icon = ? WHERE buttonId = ?",
        [newButton.icon ? newButton.icon[0].filename : null, res.insertId]
      );
    }

    console.log("Created 'module_button': ", { buttonId: res.insertId, ...newButton });
    result(null, { buttonId: res.insertId, id: res.insertId, ...newButton });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

ButtonModule.getById = async (buttonId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_button WHERE buttonId = ${buttonId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const button = {
      ...res[0],
      setting: settingContent,
    };
    
    console.log("Found 'module_button': ", button);
    result(null, button);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

ButtonModule.getDetailById = async (buttonId, result) => {
  try {
    const button = await this.getDetailContentById(buttonId);
    console.log("Found 'module_button': ", button);
    result(null, button);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

ButtonModule.getSimpleContentById = async (buttonId) => {
  if (buttonId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_button WHERE buttonId = ${buttonId}`);
      if (res.length > 0) {
        return {
          id: buttonId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

ButtonModule.getDetailContentById = async (buttonId) => {
  if (buttonId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_button WHERE buttonId = ${buttonId}`);
      if (res.length > 0) {
        const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
        const coverImageContent = await CommonModel.getDetailContentById('module_website_image', res[0].coverImageId);
        const button = {
          ...res[0],
          setting: settingContent,
          coverImage: coverImageContent,
        };
        return button;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

ButtonModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, buttonId as id FROM module_button ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_button': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

ButtonModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_button ${whereStr}`);
    console.log("'module_button' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

ButtonModule.updateById = async (buttonId, button, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_button SET internalName = ?, settingId = ?, type = ?, size = ?, iconAlign = ?, fillColor = ?, hoverColor = ?, title = ?, ctaLink = ?, linkColor = ?, linkHoverColor = ?, textAlign = ?, radius = ? WHERE buttonId = ?",
      [button.internalName, button.setting ? button.setting.id : null, button.type, button.size, button.iconAlign, button.fillColor, button.hoverColor, button.title, button.ctaLink, button.linkColor, button.linkHoverColor, button.textAlign, button.radius, buttonId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }
    if (button.iconRemove === 'true') {
      await sql.promise().query(
        "UPDATE module_button SET icon = ? WHERE buttonId = ?",
        [null, buttonId]
      );
    }
    else if (button.icon) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_button SET icon = ? WHERE buttonId = ?",
        [button.icon ? button.icon[0].filename : null, buttonId]
      );
    }

    console.log("Updated 'module_button': ", { buttonId: buttonId, ...button });
    result(null, { buttonId: buttonId, id: buttonId, ...button });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

ButtonModule.remove = async (buttonId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_button WHERE buttonId = ?", buttonId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_button' with 'buttonId': ", buttonId);
    result(null, { message: `'module_button' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

ButtonModule.removeAll = async (filter, buttonIds, result) => {
  try {
    if (!buttonIds) {
      buttonIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT buttonId FROM module_button ${whereStr}`);
        res.forEach(button => {
          buttonIds.push(button.buttonId);
        })
      }
    }
    
    let inStr = '';
    if (buttonIds.length > 0) {
      inStr = ` WHERE buttonId in (${buttonIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_button ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_button's`);
      console.log(`Deleted 'module_button' ids: ${buttonIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_button'`);
    }
    
    result(null, { message: `'module_button's were deleted successfully! Deleted ids: ${buttonIds.join(', ')}` });
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

module.exports = ButtonModule;
