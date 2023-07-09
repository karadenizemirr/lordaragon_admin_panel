"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const blog_entity_1 = require("../entity/blog.entity");
const contact_entity_1 = require("../entity/contact.entity");
const portfolio_entity_1 = require("../entity/portfolio.entity");
const setting_entity_1 = require("../entity/setting.entity");
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "administrator",
    password: "123456",
    database: "adminPanel",
    entities: [user_entity_1.User, setting_entity_1.Setting, contact_entity_1.Contact, portfolio_entity_1.Portfolio, blog_entity_1.Blog],
    synchronize: true,
    logging: true
});
exports.default = AppDataSource;
//# sourceMappingURL=dbConnect.js.map