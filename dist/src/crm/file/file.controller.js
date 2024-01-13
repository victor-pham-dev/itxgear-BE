"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const upload_utils_1 = require("./upload.utils");
const file_service_1 = require("./file.service");
const swagger_1 = require("@nestjs/swagger");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    uploadFile(file, bucket) {
        const params = {
            Bucket: bucket,
            Key: (0, upload_utils_1.editFileName)(file),
            Body: file.buffer,
        };
        return this.fileService.uploadToS3(params);
    }
    async deleteImage(bucket, fileName) {
        return this.fileService.deleteFileFromS3(bucket, fileName);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: upload_utils_1.imageFileFilter,
    })),
    (0, swagger_1.ApiHeader)({
        name: 'X-access-token',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('b')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('/image'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file' }),
    __param(0, (0, common_1.Query)('b')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "deleteImage", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('/api/v1/file'),
    (0, swagger_1.ApiTags)('files'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map