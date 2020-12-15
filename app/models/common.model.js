const Common = function() {

};

Common.moduleSelector = (moduleName) => {
  let module = null;

  switch (moduleName) {
    case 'page':
      module = require("./page.model.js");
      break;
    case 'module_seo':
      module = require("./module_seo.model.js");
      break;
    case 'module_page_setting':
      module = require("./module_page_setting.model.js");
      break;
    case 'module_section_setting':
      module = require("./module_section_setting.model.js");
      break;
    case 'module_website_image':
      module = require("./module_website_image.model.js");
      break;
    case 'module_card':
      module = require("./module_card.model.js");
      break;
    case 'module_button':
      module = require("./module_button.model.js");
      break;
    case 'module_header':
      module = require("./module_header.model.js");
      break;
    case 'module_menu_group':
      module = require("./module_menu_group.model.js");
      break;
    case 'module_multi_columns':
      module = require("./module_multi_columns.model.js");
      break;
    case 'module_slide_show':
      module = require("./module_slide_show.model.js");
      break;
  }

  return module;
}

Common.getSimpleContentById = async (moduleName, moduleId) => {
  if (moduleId) {
    const module = Common.moduleSelector(moduleName);
  
    if (module !== null) {
      return await module.getSimpleContentById(moduleId);
    }
  }

  return null;
};

Common.getDetailContentById = async (moduleName, moduleId) => {
  if (moduleId) {
    const module = Common.moduleSelector(moduleName);
  
    if (module !== null) {
      return await module.getDetailContentById(moduleId);
    }
  }

  return null;
};

Common.customJsonParse = (value) => {
  return typeof value === "object" || typeof value === "undefined" ? value : JSON.parse(value);
}

module.exports = Common;
