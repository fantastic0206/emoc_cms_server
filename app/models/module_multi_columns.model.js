const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const MultiColumns = function(multiColumns) {
  this.internalName = multiColumns.internalName;
  this.setting = CommonModel.customJsonParse(multiColumns.setting);
  this.columnCount = multiColumns.columnCount;
  this.type = multiColumns.type;
  this.columnWidths = multiColumns.columnWidths;
  this.columns = CommonModel.customJsonParse(multiColumns.columns);
  this.mobileType = multiColumns.mobileType;
};

MultiColumns.create = async (newMultiColumns, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_multi_columns SET internalName = ?, settingId = ?, type = ?, columnCount = ?, columnWidths = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newMultiColumns.internalName, newMultiColumns.setting ? newMultiColumns.setting.id : null, newMultiColumns.type , newMultiColumns.columnCount, newMultiColumns.columnWidths]
    );

    if (newMultiColumns.columns && newMultiColumns.columns.length > 0) {
      for (let i = 0; i < newMultiColumns.columns.length; i++ ) {
        const [res1, fields1] = await sql.promise().query(
          "INSERT INTO module_multi_columns__columns SET multiColumnsId = ?, moduleName = ?, moduleId = ?, createdAt = NOW(), updatedAt = NOW()", 
          [res.insertId, newMultiColumns.columns[i].moduleName, newMultiColumns.columns[i].moduleId]
        );
        console.log("Created 'module_multi_columns__columns': ", { multiColumnsColumnId: res1.insertId, ...newMultiColumns.columns[i] });
      }
    }

    console.log("Created 'module_multi_columns': ", { multiColumnsId: res.insertId, ...newMultiColumns });
    result(null, { multiColumnsId: res.insertId, id: res.insertId, ...newMultiColumns });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

MultiColumns.getById = async (multiColumnsId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_multi_columns WHERE multiColumnsId = ${multiColumnsId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }
    
    const [res1, fields1] = await sql.promise().query(`SELECT * FROM module_multi_columns__columns WHERE multiColumnsId = ${multiColumnsId}`);
    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const columns = [];
    for(let i = 0; i < res1.length; i++) {
      const moduleContent = await CommonModel.getSimpleContentById(res1[i].moduleName, res1[i].moduleId);

      columns.push({
        ...res1[i],
        module: moduleContent,
      });
    }

    const multiColumns = {
      ...res[0],
      setting: settingContent,
      columns: columns
    };

    console.log("Found 'module_multi_columns': ", multiColumns);
    result(null, multiColumns);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MultiColumns.getDetailById = async (multiColumnsId, result) => {
  try {
    const multiColumns = await this.getDetailContentById(multiColumnsId);
    console.log("Found 'module_multi_columns': ", multiColumns);
    result(null, multiColumns);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MultiColumns.getSimpleContentById = async (multiColumnsId) => {
  if (multiColumnsId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_multi_columns WHERE multiColumnsId = ${multiColumnsId}`);
      if (res.length > 0) {
        return {
          id: multiColumnsId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

MultiColumns.getDetailContentById = async (multiColumnsId) => {
  if (multiColumnsId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_multi_columns WHERE multiColumnsId = ${multiColumnsId}`);
      if (res.length > 0) {
        const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
        const [res1, fields1] = await sql.promise().query(`SELECT * FROM module_multi_columns__columns WHERE multiColumnsId = ${multiColumnsId}`);
        const columns = [];
        for(let i = 0; i < res1.length; i++) {
          const moduleContent = await CommonModel.getDetailContentById(res1[i].moduleName, res1[i].moduleId);
          columns.push({
            ...res1[i],
            module: moduleContent,
          });
        }
        const multiColumns = {
          ...res[0],
          setting: settingContent,
          columns: columns
        };
        return multiColumns;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

MultiColumns.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, multiColumnsId as id FROM module_multi_columns ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_multi_columns': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

MultiColumns.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_multi_columns ${whereStr}`);
    console.log("'module_multi_columns' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

MultiColumns.updateById = async (multiColumnsId, multiColumns, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_multi_columns SET internalName = ?, settingId = ?, type = ?, columnCount = ?, columnWidths = ?, mobileType = ? WHERE multiColumnsId = ?",
      [multiColumns.internalName, multiColumns.setting ? multiColumns.setting.id : null , multiColumns.type, multiColumns.columnCount, multiColumns.columnWidths, multiColumns.mobileType, multiColumnsId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM module_multi_columns__columns WHERE multiColumnsId = ?", multiColumnsId);

    if (multiColumns.columns && multiColumns.columns.length > 0) {
      for (let i = 0; i < multiColumns.columns.length; i++ ) {
        const [res1, fields1] = await sql.promise().query(
          "INSERT INTO module_multi_columns__columns SET multiColumnsId = ?, moduleName = ?, moduleId = ?, createdAt = NOW(), updatedAt = NOW()", 
          [multiColumnsId, multiColumns.columns[i].moduleName, multiColumns.columns[i].moduleId]
        );
        console.log("Created 'module_multi_columns__columns': ", { multiColumnsColumnId: res1.insertId, ...multiColumns.columns[i] });
      }
    }

    console.log("Updated 'module_multi_columns': ", { multiColumnsId: multiColumnsId, ...multiColumns });
    result(null, { multiColumnsId: multiColumnsId, id: multiColumnsId, ...multiColumns });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MultiColumns.remove = async (multiColumnsId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_multi_columns WHERE multiColumnsId = ?", multiColumnsId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM module_multi_columns__columns WHERE multiColumnsId = ?", multiColumnsId);

    console.log("Deleted 'module_multi_columns' with 'multiColumnsId': ", multiColumnsId);
    result(null, { message: `'module_multi_columns' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MultiColumns.removeAll = async (filter, multiColumnsIds, result) => {
  try {
    if (!multiColumnsIds) {
      multiColumnsIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT multiColumnsId FROM module_multi_columns ${whereStr}`);
        res.forEach(multiColumns => {
          multiColumnsIds.push(multiColumns.multiColumnsId);
        })
      }
    }
    
    let inStr = '';
    if (multiColumnsIds.length > 0) {
      inStr = ` WHERE multiColumnsId in (${multiColumnsIds.join(', ')}) `;
    }

    if (inStr !== '') {
      await sql.promise().query(`DELETE FROM module_multi_columns__columns ${inStr}`);
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_multi_columns ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_multi_columns's`);
      console.log('Deleted module_multi_columns ids: ', multiColumnsIds.join(', '));
    } else {
      console.log(`Deleted 0 'module_multi_columns'`);
    }
    result(null, { message: `'module_multi_columns's were deleted successfully! Deleted ids: ${multiColumnsIds.join(', ')}` });
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

module.exports = MultiColumns;
