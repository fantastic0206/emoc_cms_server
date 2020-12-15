const sql = require("./db.js");

// constructor
const PageSettingModule = function(pageSetting) {
  this.internalName = pageSetting.internalName;
  this.maxWidth = pageSetting.maxWidth;
};

PageSettingModule.create = async (newPageSetting, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_page_setting SET internalName = ?, maxWidth = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newPageSetting.internalName, newPageSetting.maxWidth]
    );

    console.log("Created 'module_page_setting': ", { pageSettingId: res.insertId, ...newPageSetting });
    result(null, { pageSettingId: res.insertId, id: res.insertId, ...newPageSetting });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

PageSettingModule.getById = async (pageSettingId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_page_setting WHERE pageSettingId = ${pageSettingId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }
    
    console.log("Found 'module_page_setting': ", res[0]);
    result(null, res[0]);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

PageSettingModule.getSimpleContentById = async (pageSettingId) => {
  if (pageSettingId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_page_setting WHERE pageSettingId = ${pageSettingId}`);
      if (res.length > 0) {
        return {
          id: pageSettingId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

PageSettingModule.getDetailContentById = async (pageSettingId) => {
  if (pageSettingId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_page_setting WHERE pageSettingId = ${pageSettingId}`);
      if (res.length > 0) {
        return res[0];
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

PageSettingModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, pageSettingId as id FROM module_page_setting ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_page_setting': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

PageSettingModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_page_setting ${whereStr}`);
    console.log("'module_page_setting' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

PageSettingModule.updateById = async (pageSettingId, pageSetting, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_page_setting SET internalName = ?, maxWidth = ? WHERE pageSettingId = ?",
      [pageSetting.internalName, pageSetting.maxWidth, pageSettingId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Updated 'module_page_setting': ", { pageSettingId: pageSettingId, ...pageSetting });
    result(null, { pageSettingId: pageSettingId, id: pageSettingId, ...pageSetting });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

PageSettingModule.remove = async (pageSettingId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_page_setting WHERE pageSettingId = ?", pageSettingId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_page_setting' with 'pageSettingId': ", pageSettingId);
    result(null, { message: `'module_page_setting' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

PageSettingModule.removeAll = async (filter, pageSettingIds, result) => {
  try {
    if (!pageSettingIds) {
      pageSettingIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT pageSettingId FROM module_page_setting ${whereStr}`);
        res.forEach(pageSetting => {
          pageSettingIds.push(pageSetting.pageSettingId);
        })
      }
    }
    
    let inStr = '';
    if (pageSettingIds.length > 0) {
      inStr = ` WHERE pageSettingId in (${pageSettingIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_page_setting ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_page_setting's`);
      console.log(`Deleted 'module_page_setting' ids: ${pageSettingIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_page_setting'`);
    }
    
    result(null, { message: `'module_page_setting's were deleted successfully! Deleted ids: ${pageSettingIds.join(', ')}` });
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

module.exports = PageSettingModule;
