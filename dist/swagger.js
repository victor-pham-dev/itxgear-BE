"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSwaggerDocument = void 0;
const swagger_1 = require("@nestjs/swagger");
const createSwaggerDocument = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API ITX GEAR')
        .setDescription('ITX GEAR SWAGGER DOCUMENTS')
        .setVersion('1.0')
        .addTag('ITX_GEAR')
        .addBearerAuth({
        name: 'X-access-token',
        type: 'http',
        in: 'Header',
    }, 'X-access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
};
exports.createSwaggerDocument = createSwaggerDocument;
//# sourceMappingURL=swagger.js.map