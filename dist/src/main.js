"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("../swagger");
const common_1 = require("@nestjs/common");
const cors_1 = require("../configs/cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug'],
    });
    app.enableCors(cors_1.default);
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, swagger_1.createSwaggerDocument)(app);
    await app.listen(8888);
}
bootstrap();
//# sourceMappingURL=main.js.map