const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const Page = function(page) {
  this.internalName = page.internalName;
  this.seo = CommonModel.customJsonParse(page.seo);
  this.pageSetting = CommonModel.customJsonParse(page.pageSetting);
  this.modules = CommonModel.customJsonParse(page.modules);
};

Page.create = async (newPage, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO page SET internalName = ?, seoId = ?, pageSettingId = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newPage.internalName, newPage.seo ? newPage.seo.id : null , newPage.pageSetting ? newPage.pageSetting.id : null]
    );

    if (newPage.modules && newPage.modules.length > 0) {
      for (let i = 0; i < newPage.modules.length; i++ ) {
        const [res1, fields1] = await sql.promise().query(
          "INSERT INTO page__modules SET pageId = ?, moduleName = ?, moduleId = ?, createdAt = NOW(), updatedAt = NOW()", 
          [res.insertId, newPage.modules[i].moduleName, newPage.modules[i].moduleId]
        );
        console.log("Created 'page__module': ", { pageModuleId: res1.insertId, ...newPage.modules[i] });
      }
    }

    console.log("Created 'page': ", { pageId: res.insertId, ...newPage });
    result(null, { pageId: res.insertId, id: res.insertId, ...newPage });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

Page.getById = async (pageId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM page WHERE pageId = ${pageId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }
    
    const seoContent = await CommonModel.getSimpleContentById('module_seo', res[0].seoId);
    const pageSettingContent = await CommonModel.getSimpleContentById('module_page_setting', res[0].pageSettingId);
    const [res1, fields1] = await sql.promise().query(`SELECT * FROM page__modules WHERE pageId = ${pageId}`);
    const modules = [];
    for(let i = 0; i < res1.length; i++) {
      const moduleContent = await CommonModel.getSimpleContentById(res1[i].moduleName, res1[i].moduleId);

      modules.push({
        ...res1[i],
        module: moduleContent,
      });
    }

    const page = {
      ...res[0],
      seo: seoContent,
      pageSetting: pageSettingContent,
      modules: modules
    };

    console.log("Found 'page': ", page);
    result(null, page);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

Page.getDetailById = async (pageId, result) => {
  try {
    const page = await Page.getDetailContentById(pageId);
    console.log("Found 'page': ", page);
    result(null, page);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

Page.getDetailBySlug = async (slug, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT A.pageId FROM module_seo B LEFT JOIN page A on A.seoId = B.seoId WHERE B.slug = '${slug}'`);
    if (res.length === 0) {
      throw { kind: "not_found" };
    }
    await Page.getDetailById(res[0].pageId, result);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

Page.getSimpleContentById = async (pageId) => {
  if (pageId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM page WHERE pageId = ${pageId}`);
      if (res.length > 0) {
        return {
          id: pageId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

Page.getDetailContentById = async (pageId) => {
  if (pageId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM page WHERE pageId = ${pageId}`);
    
      if (res.length > 0) { 
        const seoContent = await CommonModel.getDetailContentById('module_seo', res[0].seoId);
        const pageSettingContent = await CommonModel.getDetailContentById('module_page_setting', res[0].pageSettingId);
        const [res1, fields1] = await sql.promise().query(`SELECT * FROM page__modules WHERE pageId = ${pageId}`);
        const modules = [];
        for(let i = 0; i < res1.length; i++) {
          const moduleContent = await CommonModel.getDetailContentById(res1[i].moduleName, res1[i].moduleId);
          modules.push({
            ...res1[i],
            module: moduleContent,
          });
        }
        const page = {
          ...res[0],
          seo: seoContent,
          pageSetting: pageSettingContent,
          modules: modules
        };
        return page;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  return null;
};

Page.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, pageId as id FROM page ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'page': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

Page.getAllSlugs = async (result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT B.slug FROM page A LEFT JOIN module_seo B on A.seoId = B.seoId WHERE A.seoId IS NOT NULL AND B.slug IS NOT NULL`);
    console.log("All 'page' slugs: ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

Page.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM page ${whereStr}`);
    console.log("'page' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

Page.updateById = async (pageId, page, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE page SET internalName = ?, seoId = ?, pageSettingId = ? WHERE pageId = ?",
      [page.internalName, page.seo ? page.seo.id : null, page.pageSetting ? page.pageSetting.id : null, pageId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM page__modules WHERE pageId = ?", pageId);

    if (page.modules && page.modules.length > 0) {
      for (let i = 0; i < page.modules.length; i++ ) {
        const [res1, fields1] = await sql.promise().query(
          "INSERT INTO page__modules SET pageId = ?, moduleName = ?, moduleId = ?, createdAt = NOW(), updatedAt = NOW()", 
          [pageId, page.modules[i].moduleName, page.modules[i].moduleId]
        );
        console.log("Created 'page__module': ", { pageModuleId: res1.insertId, ...page.modules[i] });
      }
    }

    console.log("Updated 'page': ", { pageId: pageId, ...page });
    result(null, { pageId: pageId, id: pageId, ...page });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

Page.remove = async (pageId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM page WHERE pageId = ?", pageId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    await sql.promise().query("DELETE FROM page__modules WHERE pageId = ?", pageId);

    console.log("Deleted 'page' with 'pageId': ", pageId);
    result(null, { message: `'page' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

Page.removeAll = async (filter, pageIds, result) => {
  try {
    if (!pageIds) {
      pageIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT pageId FROM page ${whereStr}`);
        res.forEach(page => {
          pageIds.push(page.pageId);
        })
      }
    }
    
    let inStr = '';
    if (pageIds.length > 0) {
      inStr = ` WHERE pageId in (${pageIds.join(', ')}) `;
    }

    if (inStr !== '') {
      await sql.promise().query(`DELETE FROM page__modules ${inStr}`);
      const [res1, fields1] = await sql.promise().query(`DELETE FROM page ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'page's`);
      console.log('Deleted pages ids: ', pageIds.join(', '));
    } else {
      console.log(`Deleted 0 'page'`);
    }
    result(null, { message: `'pages's were deleted successfully! Deleted ids: ${pageIds.join(', ')}` });
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

module.exports = Page;
