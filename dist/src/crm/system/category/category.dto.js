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
exports.UpdateCategoryFilterDto = exports.UpdateCategoryDto = exports.EditCategoryProps = exports.CreateCategoryDto = exports.CategoryProps = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CategoryProps {
}
exports.CategoryProps = CategoryProps;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategoryProps.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
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
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CategoryProps.prototype, "active", void 0);
class CreateCategoryDto extends CategoryProps {
}
exports.CreateCategoryDto = CreateCategoryDto;
class EditCategoryProps extends CategoryProps {
}
exports.EditCategoryProps = EditCategoryProps;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], EditCategoryProps.prototype, "id", void 0);
class UpdateCategoryDto extends EditCategoryProps {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
class UpdateCategoryFilterDto {
}
exports.UpdateCategoryFilterDto = UpdateCategoryFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCategoryFilterDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateCategoryFilterDto.prototype, "categoryFilterId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCategoryFilterDto.prototype, "applyForChildren", void 0);
//# sourceMappingURL=category.dto.js.map