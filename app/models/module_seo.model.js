const sql = require("./db.js");
const CommonModel = require("../models/common.model.js");

// constructor
const SeoModule = function(seo) {
  this.internalName = seo.internalName;
  this.slug = seo.slug;
  this.featuredImage = CommonModel.customJsonParse(seo.featuredImage);
  this.title = seo.title;
  this.description = seo.description;
};

SeoModule.create = async (newSeo, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_seo SET internalName = ?, slug = ?, featuredImageId = ?, title = ?, description = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newSeo.internalName, newSeo.slug, newSeo.featuredImage ? newSeo.featuredImage.id : null, newSeo.title, newSeo.description]
    );

    console.log("Created 'module_seo': ", { seoId: res.insertId, ...newSeo });
    result(null, { seoId: res.insertId, id: res.insertId, ...newSeo });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

SeoModule.getById = async (seoId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_seo WHERE seoId = ${seoId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const featuredImageContent = await CommonModel.getSimpleContentById('module_website_image', res[0].featuredImageId);
    const seo = {
      ...res[0],
      featuredImage: featuredImageContent
    };
    
    console.log("Found 'module_seo': ", seo);
    result(null, seo);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SeoModule.getDetailById = async (seoId, result) => {
  try {
    const seo = await this.getDetailContentById(seoId);
    console.log("Found 'module_seo': ", seo);
    result(null, seo);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SeoModule.getSimpleContentById = async (seoId) => {
  if (seoId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_seo WHERE seoId = ${seoId}`);
      if (res.length > 0) {
        return {
          id: seoId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

SeoModule.getDetailContentById = async (seoId) => {
  if (seoId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_seo WHERE seoId = ${seoId}`);
    
      if (res.length > 0) {
        const featuredImageContent = await CommonModel.getDetailContentById('module_website_image', res[0].featuredImageId);
        const seo = {
          ...res[0],
          featuredImage: featuredImageContent
        };
        return seo;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

SeoModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, seoId as id FROM module_seo ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_seo': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

SeoModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_seo ${whereStr}`);
    console.log("'module_seo' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

SeoModule.updateById = async (seoId, seo, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_seo SET internalName = ?, slug = ?, featuredImageId = ?, title = ?, description = ? WHERE seoId = ?",
      [seo.internalName, seo.slug, seo.featuredImage ? seo.featuredImage.id : null, seo.title, seo.description, seoId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Updated 'module_seo': ", { seoId: seoId, ...seo });
    result(null, { seoId: seoId, id: seoId, ...seo });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SeoModule.remove = async (seoId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_seo WHERE seoId = ?", seoId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_seo' with 'seoId': ", seoId);
    result(null, { message: `'module_seo' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SeoModule.removeAll = async (filter, seoIds, result) => {
  try {
    if (!seoIds) {
      seoIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT seoId FROM module_seo ${whereStr}`);
        res.forEach(seo => {
          seoIds.push(seo.seoId);
        })
      }
    }
    
    let inStr = '';
    if (seoIds.length > 0) {
      inStr = ` WHERE seoId in (${seoIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_seo ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_seo's`);
      console.log(`Deleted 'module_seo' ids: ${seoIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_seo'`);
    }
    
    result(null, { message: `'module_seo's were deleted successfully! Deleted ids: ${seoIds.join(', ')}` });
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

    if (filter.slug) {
      whereClause.push(`(slug like '%${filter.slug}%')`);
    }

    if (filter.title) {
      whereClause.push(`(title like '%${filter.title}%')`);
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

module.exports = SeoModule;
