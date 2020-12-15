const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config();

const port = process.env.SERVER_PORT || 5000;

const app = express();

app.use(cors())
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('upload'));
app.post("/", (req, res) => {
  console.log("<>post", req);
})
app.get("/", (req, res) => {
  console.log("<>get", req);
})
require("./app/routes/page.routes.js")(app);
require("./app/routes/module_seo.routes.js")(app);
require("./app/routes/module_page_setting.routes.js")(app);
require("./app/routes/module_site_setting.routes.js")(app);
require("./app/routes/module_section_setting.routes.js")(app);
require("./app/routes/module_website_image.routes.js")(app);
require("./app/routes/module_multi_columns.routes.js")(app);
require("./app/routes/module_card.routes.js")(app);
require("./app/routes/module_button.routes.js")(app);
require("./app/routes/module_menu_group.routes.js")(app);
require("./app/routes/module_header.routes.js")(app);
require("./app/routes/module_slide_show.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});