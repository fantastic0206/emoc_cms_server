const sql = require("./db.js");
const CommonModel = require("./common.model.js");

// constructor
const CardModule = function(card) {
  this.internalName = card.internalName;
  this.setting = CommonModel.customJsonParse(card.setting);
  this.type = card.type;
  this.coverImage = CommonModel.customJsonParse(card.coverImage);
  this.title = card.title;
  this.subhead = card.subhead;
  this.description = card.description;
  this.linkButton = CommonModel.customJsonParse(card.linkButton);
  this.horizontalAlign = card.horizontalAlign;
  this.verticalAlign = card.verticalAlign;
};

CardModule.create = async (newCard, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "INSERT INTO module_card SET internalName = ?, settingId = ?, type = ?, coverImageId = ?, title = ?, subhead = ?, description = ?, linkButtonId = ?, horizontalAlign = ?, verticalAlign = ?, createdAt = NOW(), updatedAt = NOW()", 
      [newCard.internalName, newCard.setting ? newCard.setting.id : null, newCard.type, newCard.coverImage ? newCard.coverImage.id : null, newCard.title, newCard.subhead, newCard.description, newCard.linkButton ? newCard.linkButton.id : null, newCard.horizontalAlign, newCard.verticalAlign]
    );

    console.log("Created 'module_card': ", { cardId: res.insertId, ...newCard });
    result(null, { cardId: res.insertId, id: res.insertId, ...newCard });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  };
};

CardModule.getById = async (cardId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_card WHERE cardId = ${cardId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const settingContent = await CommonModel.getSimpleContentById('module_section_setting', res[0].settingId);
    const coverImageContent = await CommonModel.getSimpleContentById('module_website_image', res[0].coverImageId);
    const linkButtonContent = await CommonModel.getSimpleContentById('module_button', res[0].linkButtonId);
    const card = {
      ...res[0],
      setting: settingContent,
      coverImage: coverImageContent,
      linkButton: linkButtonContent
    };
    
    console.log("Found 'module_card': ", card);
    result(null, card);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

CardModule.getDetailById = async (cardId, result) => {
  try {
    const card = await this.getDetailContentById(cardId);
    console.log("Found 'module_card': ", card);
    result(null, card);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

CardModule.getSimpleContentById = async (cardId) => {
  if (cardId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT internalName FROM module_card WHERE cardId = ${cardId}`);
      if (res.length > 0) {
        return {
          id: cardId,
          internalName: res[0].internalName
        };
      }
    } catch (err) {
      return null;
    }
  }
  
  return null;
};

CardModule.getDetailContentById = async (cardId) => {
  if (cardId) {
    try {
      const [res, fields] = await sql.promise().query(`SELECT * FROM module_card WHERE cardId = ${cardId}`);
      if (res.length > 0) {
        const settingContent = await CommonModel.getDetailContentById('module_section_setting', res[0].settingId);
        const coverImageContent = await CommonModel.getDetailContentById('module_website_image', res[0].coverImageId);
        const linkButtonContent = await CommonModel.getDetailContentById('module_button', res[0].linkButtonId);
        const card = {
          ...res[0],
          setting: settingContent,
          coverImage: coverImageContent,
          linkButton: linkButtonContent
        };
        return card;
      }
    } catch (err) {
      return null;
    }
  }
  return null;
};

CardModule.getAll = async (filter, sorting, paging, result) => {
  try {
    const {whereStr, orderStr, pagingStr} = getWhereOrderLimitStr(filter, sorting, paging);
    const [res, fields] = await sql.promise().query(`SELECT *, cardId as id FROM module_card ${whereStr} ${orderStr} ${pagingStr}`);
    console.log("All 'module_card': ", res);
    result(null, res);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

CardModule.getLength = async (filter, result) => {
  try {
    const { whereStr } = getWhereOrderLimitStr(filter);
    const [res, fields] = await sql.promise().query(`SELECT COUNT(*) as cnt FROM module_card ${whereStr}`);
    console.log("'module_card' length: ", res[0].cnt);
    result(null, {length: res[0].cnt});
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
};

CardModule.updateById = async (cardId, card, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_card SET internalName = ?, settingId = ?, type = ?, coverImageId = ?, title = ?, subhead = ?, description = ?, linkButtonId = ?, horizontalAlign = ?, verticalAlign = ? WHERE cardId = ?",
      [card.internalName, card.setting ? card.setting.id : null, card.type, card.coverImage ? card.coverImage.id : null, card.title, card.subhead, card.description, card.linkButton ? card.linkButton.id : null, card.horizontalAlign, card.verticalAlign, cardId]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Updated 'module_card': ", { cardId: cardId, ...card });
    result(null, { cardId: cardId, id: cardId, ...card });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

CardModule.remove = async (cardId, result) => {
  try {
    const [res, fields] = await sql.promise().query("DELETE FROM module_card WHERE cardId = ?", cardId);

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }

    console.log("Deleted 'module_card' with 'cardId': ", cardId);
    result(null, { message: `'module_card' was deleted successfully!` });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

CardModule.removeAll = async (filter, cardIds, result) => {
  try {
    if (!cardIds) {
      cardIds = [];
    }

    if (filter) {
      const { whereStr } = getWhereOrderLimitStr(filter);

      if (whereStr !== '') {
        const [res, fields] = await sql.promise().query(`SELECT cardId FROM module_card ${whereStr}`);
        res.forEach(card => {
          cardIds.push(card.cardId);
        })
      }
    }
    
    let inStr = '';
    if (cardIds.length > 0) {
      inStr = ` WHERE cardId in (${cardIds.join(', ')}) `;
    }

    if (inStr !== '') {
      const [res1, fields1] = await sql.promise().query(`DELETE FROM module_card ${inStr}`);
      console.log(`Deleted ${res1.affectedRows} 'module_card's`);
      console.log(`Deleted 'module_card' ids: ${cardIds.join(', ')}`);
    } else {
      console.log(`Deleted 0 'module_card'`);
    }
    
    result(null, { message: `'module_card's were deleted successfully! Deleted ids: ${cardIds.join(', ')}` });
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

module.exports = CardModule;
