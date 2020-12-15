const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const MenuGroupModule = function(menuGroup) {
  this.internalName = menuGroup.internalName;
  this.setting = CommonModel.customJsonParse(menuGroup.setting);
  this.align = menuGroup.align;
  this.buttons = CommonModel.customJsonParse(menuGroup.buttons);
};

MenuGroupModule.create = async (newMenuGroup, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_menu_group SET internalName = ?, settingId = ?, align = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newMenuGroup.internalName, newMenuGroup.setting ? newMenuGroup.setting.id : null, newMenuGroup.align]
    );

    if (newMenuGroup.buttons && newMenuGroup.buttons.length > 0) {
      for (let i = 0; i < newMenuGroup.buttons.length; i++ ) {
        const [res1, fields1] = await sql.promise().query(
          "INSERT INTO module_menu_group__buttons SET menuGroupId = ?, moduleName = ?, moduleId = ?, createdAt = NOW(), updatedAt = NOW()", 
          [res.insertId, newMenuGroup.buttons[i].moduleName, newMenuGroup.buttons[i].moduleId]
        );
        console.log("Created 'module_menu_group__buttons': ", { menuGroupButtons: res1.insertId, ...newMenuGroup.buttons[i] });
      }
    }

    console.log("Created 'module_menu_group': ", { menuGroupId: res.insertId, ...newMenuGroup });
    result(null, { menuGroupId: res.insertId, id: res.insertId, ...newMenuGroup });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

MenuGroupModule.getById = async (menuGroupId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_menu_group WHERE menuGroupId = ${menuGroupId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const [res1, fields1] = await sql.promise().query(`SELECT * FROM module_menu_group__buttons WHERE menuGroupId = ${menuGroupId}`);  
    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const buttons = [];
    for(let i = 0; i < res1.length; i++) {
      const moduleContent = await CommonModel.getSimpleContentById(res1[i].moduleName, res1[i].moduleId);

      buttons.push({
        ...res1[i],
        module: moduleContent,
      });
    }
    const menuGroup = {
      ...res[0],
      setting: settingContent,
      buttons: buttons,
    };
    
    console.log("Found 'module_menu_group': ", menuGroup);
    result(null, menuGroup);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MenuGroupModule.getDetailById = async (menuGroupId, result) => {
  try {
    const menuGroup = await this.getDetailContentById(menuGroupId);
    console.log("Found 'module_menu_group': ", menuGroup);
    result(null, menuGroup);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MenuGroupModule.getSimpleContentById = async (menuGroupId) => {
  if (menuGroupId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_menu_group WHERE menuGroupId = ${menuGroupId}`);
      if (res.length > 0) {
        return {
          id: menuGroupId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

MenuGroupModule.getDetailContentById = async (menuGroupId) => {
  if (menuGroupId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_menu_group WHERE menuGroupId = ${menuGroupId}`);
      if (res.length > 0) {
        const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
        const [res1, fields1] = await sql.promise().query(`SELECT * FROM module_menu_group__buttons WHERE menuGroupId = ${menuGroupId}`);
        const buttons = [];
        for(let i = 0; i < res1.length; i++) {
          const moduleContent = await CommonModel.getDetailContentById(res1[i].moduleName, res1[i].moduleId);
          buttons.push({
            ...res1[i],
            module: moduleContent,
          });
        }
        const menuGroup = {
          ...res[0],
          setting: settingContent,
          buttons: buttons,
        };
        return menuGroup;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

MenuGroupModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, menuGroupId as id FROM module_menu_group ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_menu_group': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

MenuGroupModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_menu_group ${whereStr}`);
    console.log("'module_menu_group' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

MenuGroupModule.updateById = async (menuGroupId, menuGroup, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_menu_group SET internalName = ?, settingId = ?, align = ? WHERE menuGroupId = ?",
      [menuGroup.internalName, menuGroup.setting ? menuGroup.setting.id : null, menuGroup.align, menuGroupId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM module_menu_group__buttons WHERE menuGroupId = ?", menuGroupId);

    if (menuGroup.buttons && menuGroup.buttons.length > 0) {
      for (let i = 0; i < menuGroup.buttons.length; i++ ) {
        const [res1, fields1] = await sql.promise().query(
          "INSERT INTO module_menu_group__buttons SET menuGroupId = ?, moduleName = ?, moduleId = ?, createdAt = NOW(), updatedAt = NOW()", 
          [menuGroupId, menuGroup.buttons[i].moduleName, menuGroup.buttons[i].moduleId]
        );
        console.log("Created 'module_menu_group__buttons': ", { menuGroupId: res1.insertId, ...menuGroup.buttons[i] });
      }
    }

    console.log("Updated 'module_menu_group': ", { menuGroupId: menuGroupId, ...menuGroup });
    result(null, { menuGroupId: menuGroupId, id: menuGroupId, ...menuGroup });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MenuGroupModule.remove = async (menuGroupId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_menu_group WHERE menuGroupId = ?", menuGroupId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM module_menu_group__buttons WHERE menuGroupId = ?", menuGroupId);

    console.log("Deleted 'module_menu_group' with 'menuGroupId': ", menuGroupId);
    result(null, { message: `'module_menu_group' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

MenuGroupModule.removeAll = async (filter, menuGroupIds, result) => {
  try {
    if (!menuGroupIds) {
      menuGroupIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT menuGroupId FROM module_menu_group ${whereStr}`);
        res.forEach(menuGroup => {
          menuGroupIds.push(menuGroup.menuGroupId);
        })
      }
    }
    
    let inStr = '';
    if (menuGroupIds.length > 0) {
      inStr = ` WHERE menuGroupId in (${menuGroupIds.join(', ')}) `;
    }

    if (inStr !== '') {
      await sql.promise().query(`DELETE FROM module_menu_group__buttons ${inStr}`);
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_menu_group ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_menu_group's`);
      console.log(`Deleted 'module_menu_group' ids: ${menuGroupIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_menu_group'`);
    }
    
    result(null, { message: `'module_menu_group's were deleted successfully! Deleted ids: ${menuGroupIds.join(', ')}` });
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

module.exports = MenuGroupModule;
