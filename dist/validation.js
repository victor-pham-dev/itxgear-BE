"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationOptions = void 0;
exports.validationOptions = {
    transform: true,
    disableErrorMessages: false,
    exceptionFactory: (errors) => {
        return { message: 'Content can not process', errors };
    },
    errorHttpStatusCode: 422,
};
//# sourceMappingURL=validation.js.map