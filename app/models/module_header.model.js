const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const HeaderModule = function(header) {
  this.internalName = header.internalName;
  this.setting = CommonModel.customJsonParse(header.setting);
  this.designType = header.designType;
  this.image1 = CommonModel.customJsonParse(header.image1);
  this.image2 = CommonModel.customJsonParse(header.image2);
  this.menuGroup1 = CommonModel.customJsonParse(header.menuGroup1);
  this.menuGroup2 = CommonModel.customJsonParse(header.menuGroup2);
  this.menuGroup3 = CommonModel.customJsonParse(header.menuGroup3);
};

HeaderModule.create = async (newHeader, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_header SET internalName = ?, settingId = ?, designType = ?, image1 = ?, image2 = ?, menuGroup1 = ?, menuGroup2 = ?, menuGroup3 = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newHeader.internalName, newHeader.setting ? newHeader.setting.id : null, newHeader.designType, newHeader.image1 ? newHeader.image1.id : null, newHeader.image2 ? newHeader.image2.id : null, newHeader.menuGroup1 ? newHeader.menuGroup1.id : null, newHeader.menuGroup2 ? newHeader.menuGroup2.id : null, newHeader.menuGroup3 ? newHeader.menuGroup3.id : null]
    );

    console.log("Created 'module_header': ", { headerId: res.insertId, ...newHeader });
    result(null, { headerId: res.insertId, id: res.insertId, ...newHeader });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

HeaderModule.getById = async (headerId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_header WHERE headerId = ${headerId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const image1 = await CommonModel.getSimpleContentById('module_button', res[0].image1);
    const image2 = await CommonModel.getSimpleContentById('module_button', res[0].image2);
    const menuGroup1 = await CommonModel.getSimpleContentById('module_menu_group', res[0].menuGroup1);
    const menuGroup2 = await CommonModel.getSimpleContentById('module_menu_group', res[0].menuGroup2);
    const menuGroup3 = await CommonModel.getSimpleContentById('module_menu_group', res[0].menuGroup3);
    const header = {
      ...res[0],
      setting: settingContent,
      image1: image1,
      image2: image2,
      menuGroup1: menuGroup1,
      menuGroup2: menuGroup2,
      menuGroup3: menuGroup3
    };
    
    console.log("Found 'module_header': ", header);
    result(null, header);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

HeaderModule.getDetailById = async (headerId, result) => {
  try {
    const header = await this.getDetailContentById(headerId);
    console.log("Found 'module_header': ", header);
    result(null, header);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

HeaderModule.getSimpleContentById = async (headerId) => {
  if (headerId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_header WHERE headerId = ${headerId}`);
      if (res.length > 0) {
        return {
          id: headerId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

HeaderModule.getDetailContentById = async (headerId) => {
  if (headerId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_header WHERE headerId = ${headerId}`);
      if (res.length > 0) {
        const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
        const image1 = await CommonModel.getDetailContentById('module_button', res[0].image1);
        const image2 = await CommonModel.getDetailContentById('module_button', res[0].image2);
        const menuGroup1 = await CommonModel.getDetailContentById('module_menu_group', res[0].menuGroup1);
        const menuGroup2 = await CommonModel.getDetailContentById('module_menu_group', res[0].menuGroup2);
        const menuGroup3 = await CommonModel.getDetailContentById('module_menu_group', res[0].menuGroup3);
        const header = {
          ...res[0],
          setting: settingContent,
          image1: image1,
          image2: image2,
          menuGroup1: menuGroup1,
          menuGroup2: menuGroup2,
          menuGroup3: menuGroup3
        };
        return header;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

HeaderModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, headerId as id FROM module_header ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_header': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

HeaderModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_header ${whereStr}`);
    console.log("'module_header' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

HeaderModule.updateById = async (headerId, header, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_header SET internalName = ?, settingId = ?, designType = ?, image1 = ?, image2 = ?, menuGroup1 = ?, menuGroup2 = ?, menuGroup3 = ? WHERE headerId = ?",
      [header.internalName, header.setting ? header.setting.id : null, header.designType, header.image1 ? header.image1.id : null, header.image2 ? header.image2.id : null, header.menuGroup1 ? header.menuGroup1.id : null, header.menuGroup2 ? header.menuGroup2.id : null, header.menuGroup3 ? header.menuGroup3.id : null, headerId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Updated 'module_header': ", { headerId: headerId, ...header });
    result(null, { headerId: headerId, id: headerId, ...header });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

HeaderModule.remove = async (headerId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_header WHERE headerId = ?", headerId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_header' with 'headerId': ", headerId);
    result(null, { message: `'module_header' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

HeaderModule.removeAll = async (filter, headerIds, result) => {
  try {
    if (!headerIds) {
      headerIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT headerId FROM module_header ${whereStr}`);
        res.forEach(header => {
          headerIds.push(header.headerId);
        })
      }
    }
    
    let inStr = '';
    if (headerIds.length > 0) {
      inStr = ` WHERE headerId in (${headerIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_header ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_header's`);
      console.log(`Deleted 'module_header' ids: ${headerIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_header'`);
    }
    
    result(null, { message: `'module_header's were deleted successfully! Deleted ids: ${headerIds.join(', ')}` });
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

module.exports = HeaderModule;
