"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./modules/user/user.module");
const setting_module_1 = require("./modules/setting/setting.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const contact_module_1 = require("./modules/contact/contact.module");
const portfolio_module_1 = require("./modules/portfolio/portfolio.module");
const blog_module_1 = require("./modules/blog/blog.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            setting_module_1.SettingModule,
            contact_module_1.ContactModule,
            portfolio_module_1.PortfolioModule,
            blog_module_1.BlogModule,
            platform_express_1.MulterModule.register({ dest: 'public' }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public')
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map