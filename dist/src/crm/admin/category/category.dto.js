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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDto = exports.EditCategoryProps = exports.CreateDto = exports.CategoryProps = void 0;
const swagger_1 = require("@nestjs/swagger");
class CategoryProps {
}
exports.CategoryProps = CategoryProps;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryProps.prototype, "alias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryProps.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryProps.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryProps.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CategoryProps.prototype, "parentId", void 0);
class CreateDto extends CategoryProps {
}
exports.CreateDto = CreateDto;
class EditCategoryProps extends CategoryProps {
}
exports.EditCategoryProps = EditCategoryProps;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EditCategoryProps.prototype, "id", void 0);
class UpdateDto extends EditCategoryProps {
}
exports.UpdateDto = UpdateDto;
//# sourceMappingURL=category.dto.js.map