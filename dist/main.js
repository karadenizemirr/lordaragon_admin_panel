"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dbConnect_1 = require("./helpers/dbConnect");
dbConnect_1.default.initialize()
    .then(() => {
    console.log('Database connect success');
})
    .catch((err) => {
    console.log('Database connect error');
    console.error(err);
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    console.log('Server is starting..');
}
bootstrap();
//# sourceMappingURL=main.js.map