const sql = require("./db.js");
const CommonModel = require("../models/common.model.js");

// constructor
const SiteSettingModule = function(siteSetting) {
  this.internalName = siteSetting.internalName;
  this.siteName = siteSetting.siteName;
  this.maxWidth = siteSetting.maxWidth;
  this.favicon = siteSetting.favicon;
  this.defaultLinkTextColor = siteSetting.defaultLinkTextColor;
  this.defaultLinkTextHoverColor = siteSetting.defaultLinkTextHoverColor;
  this.h1Font = siteSetting.h1Font;
  this.h1FontSize = siteSetting.h1FontSize;
  this.h1FontColor = siteSetting.h1FontColor;
  this.h1FontFormat = siteSetting.h1FontFormat;
  this.h1FontAlign = siteSetting.h1FontAlign;
  this.h1LineHeight = siteSetting.h1LineHeight;
  this.h1LetterSpacing = siteSetting.h1LetterSpacing;
  this.h2Font = siteSetting.h2Font;
  this.h2FontSize = siteSetting.h2FontSize;
  this.h2FontColor = siteSetting.h2FontColor;
  this.h2FontFormat = siteSetting.h2FontFormat;
  this.h2FontAlign = siteSetting.h2FontAlign;
  this.h2LineHeight = siteSetting.h2LineHeight;
  this.h2LetterSpacing = siteSetting.h2LetterSpacing;
  this.h3Font = siteSetting.h3Font;
  this.h3FontSize = siteSetting.h3FontSize;
  this.h3FontColor = siteSetting.h3FontColor;
  this.h3FontFormat = siteSetting.h3FontFormat;
  this.h3FontAlign = siteSetting.h3FontAlign;
  this.h3LineHeight = siteSetting.h3LineHeight;
  this.h3LetterSpacing = siteSetting.h3LetterSpacing;
  this.h4Font = siteSetting.h4Font;
  this.h4FontSize = siteSetting.h4FontSize;
  this.h4FontColor = siteSetting.h4FontColor;
  this.h4FontFormat = siteSetting.h4FontFormat;
  this.h4FontAlign = siteSetting.h4FontAlign;
  this.h4LineHeight = siteSetting.h4LineHeight;
  this.h4LetterSpacing = siteSetting.h4LetterSpacing;
  this.h5Font = siteSetting.h5Font;
  this.h5FontSize = siteSetting.h5FontSize;
  this.h5FontColor = siteSetting.h5FontColor;
  this.h5FontFormat = siteSetting.h5FontFormat;
  this.h5FontAlign = siteSetting.h5FontAlign;
  this.h5LineHeight = siteSetting.h5LineHeight;
  this.h5LetterSpacing = siteSetting.h5LetterSpacing;
  this.h6Font = siteSetting.h6Font;
  this.h6FontSize = siteSetting.h6FontSize;
  this.h6FontColor = siteSetting.h6FontColor;
  this.h6FontFormat = siteSetting.h6FontFormat;
  this.h6FontAlign = siteSetting.h6FontAlign;
  this.h6LineHeight = siteSetting.h6LineHeight;
  this.h6LetterSpacing = siteSetting.h6LetterSpacing;
  this.normalFont = siteSetting.normalFont;
  this.normalFontSize = siteSetting.normalFontSize;
  this.normalFontColor = siteSetting.normalFontColor;
  this.normalFontFormat = siteSetting.normalFontFormat;
  this.normalFontAlign = siteSetting.normalFontAlign;
  this.normalLineHeight = siteSetting.normalLineHeight;
  this.normalLetterSpacing = siteSetting.normalLetterSpacing;
  this.faviconRemove = siteSetting.faviconRemove;
};

SiteSettingModule.getById = async (siteSettingId, result) => {
  try {
    const [res, fields] = await sql.promise().query(`SELECT * FROM module_site_setting WHERE siteSettingId = ${siteSettingId}`);
    
    if (res.length === 0) {
      throw { kind: "not_found" };
    }

    const siteSetting = {
      ...res[0],
    };
    
    console.log("Found 'module_site_setting': ", siteSetting);
    result(null, siteSetting);
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

SiteSettingModule.updateById = async (siteSettingId, siteSetting, result) => {
  try {
    const [res, fields] = await sql.promise().query(
      "UPDATE module_site_setting SET " +
      "internalName = ?, " + 
      "maxWidth = ?, " + 
      "siteName = ?, " + 
      "defaultLinkTextColor = ?, " + 
      "defaultLinkTextHoverColor = ?, " + 
      "h1Font = ?, " + 
      "h1FontSize = ?, " + 
      "h1FontColor = ?, " + 
      "h1FontFormat = ?, " + 
      "h1FontAlign = ?, " + 
      "h1LineHeight = ?, " + 
      "h1LetterSpacing = ?, " + 
      "h2Font = ?, " + 
      "h2FontSize = ?, " + 
      "h2FontColor = ?, " + 
      "h2FontFormat = ?, " + 
      "h2FontAlign = ?, " + 
      "h2LineHeight = ?, " + 
      "h2LetterSpacing = ?, " + 
      "h3Font = ?, " + 
      "h3FontSize = ?, " + 
      "h3FontColor = ?, " + 
      "h3FontFormat = ?, " + 
      "h3FontAlign = ?, " + 
      "h3LineHeight = ?, " + 
      "h3LetterSpacing = ?, " + 
      "h4Font = ?, " + 
      "h4FontSize = ?, " + 
      "h4FontColor = ?, " + 
      "h4FontFormat = ?, " + 
      "h4FontAlign = ?, " + 
      "h4LineHeight = ?, " + 
      "h4LetterSpacing = ?, " + 
      "h5Font = ?, " + 
      "h5FontSize = ?, " + 
      "h5FontColor = ?, " + 
      "h5FontFormat = ?, " + 
      "h5FontAlign = ?, " + 
      "h5LineHeight = ?, " + 
      "h5LetterSpacing = ?, " + 
      "h6Font = ?, " + 
      "h6FontSize = ?, " + 
      "h6FontColor = ?, " + 
      "h6FontFormat = ?, " + 
      "h6FontAlign = ?, " + 
      "h6LineHeight = ?, " + 
      "h6LetterSpacing = ?, " + 
      "normalFont = ?, " + 
      "normalFontSize = ?, " + 
      "normalFontColor = ?, " + 
      "normalFontFormat = ?, " + 
      "normalFontAlign = ?, " + 
      "normalLineHeight = ?, " + 
      "normalLetterSpacing = ? " + 
      "WHERE siteSettingId = ?",
      [
        siteSetting.internalName, 
        siteSetting.maxWidth, 
        siteSetting.siteName, 
        siteSetting.defaultLinkTextColor, 
        siteSetting.defaultLinkTextHoverColor, 
        siteSetting.h1Font, 
        siteSetting.h1FontSize, 
        siteSetting.h1FontColor, 
        siteSetting.h1FontFormat, 
        siteSetting.h1FontAlign, 
        siteSetting.h1LineHeight, 
        siteSetting.h1LetterSpacing, 
        siteSetting.h2Font, 
        siteSetting.h2FontSize, 
        siteSetting.h2FontColor, 
        siteSetting.h2FontFormat, 
        siteSetting.h2FontAlign, 
        siteSetting.h2LineHeight, 
        siteSetting.h2LetterSpacing, 
        siteSetting.h3Font, 
        siteSetting.h3FontSize, 
        siteSetting.h3FontColor, 
        siteSetting.h3FontFormat, 
        siteSetting.h3FontAlign, 
        siteSetting.h3LineHeight, 
        siteSetting.h3LetterSpacing, 
        siteSetting.h4Font, 
        siteSetting.h4FontSize, 
        siteSetting.h4FontColor, 
        siteSetting.h4FontFormat, 
        siteSetting.h4FontAlign, 
        siteSetting.h4LineHeight, 
        siteSetting.h4LetterSpacing, 
        siteSetting.h5Font, 
        siteSetting.h5FontSize, 
        siteSetting.h5FontColor, 
        siteSetting.h5FontFormat, 
        siteSetting.h5FontAlign, 
        siteSetting.h5LineHeight, 
        siteSetting.h5LetterSpacing, 
        siteSetting.h6Font, 
        siteSetting.h6FontSize, 
        siteSetting.h6FontColor, 
        siteSetting.h6FontFormat, 
        siteSetting.h6FontAlign, 
        siteSetting.h6LineHeight, 
        siteSetting.h6LetterSpacing, 
        siteSetting.normalFont, 
        siteSetting.normalFontSize, 
        siteSetting.normalFontColor, 
        siteSetting.normalFontFormat, 
        siteSetting.normalFontAlign, 
        siteSetting.normalLineHeight, 
        siteSetting.normalLetterSpacing, 
        siteSettingId
      ]
    );

    if (res.affectedRows == 0) {
      throw { kind: "not_found" };
    }
    if (siteSetting.faviconRemove === 'true') {
      await sql.promise().query(
        "UPDATE module_site_setting SET favicon = ? WHERE siteSettingId = ?",
        [null, siteSettingId]
      );
    }
    else if (siteSetting.favicon) {
      const [res1, fields1] = await sql.promise().query(
        "UPDATE module_site_setting SET favicon = ? WHERE siteSettingId = ?",
        [siteSetting.favicon ? siteSetting.favicon[0].filename : null, siteSettingId]
      );
    }

    console.log("Updated 'module_site_setting': ", { siteSettingId: siteSettingId, ...siteSetting });
    result(null, { siteSettingId: siteSettingId, id: siteSettingId, ...siteSetting });
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

module.exports = SiteSettingModule;
