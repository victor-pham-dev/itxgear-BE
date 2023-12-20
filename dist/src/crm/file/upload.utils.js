"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new common_1.HttpException('Only allow jpg|jpeg|png|gif', common_1.HttpStatus.UNPROCESSABLE_ENTITY), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (file) => {
    const name = file.originalname.split('.')[0];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    return `${name}-${randomName}`;
};
exports.editFileName = editFileName;
//# sourceMappingURL=upload.utils.js.map