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
exports.UpdateTaskInput = exports.CreateTaskInput = void 0;
const type_graphql_1 = require("type-graphql");
let CreateTaskInput = class CreateTaskInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true, defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateTaskInput.prototype, "completed", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true, defaultValue: 'green' }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "priority", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CreateTaskInput.prototype, "dueDate", void 0);
CreateTaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateTaskInput);
exports.CreateTaskInput = CreateTaskInput;
let UpdateTaskInput = class UpdateTaskInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateTaskInput.prototype, "completed", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "priority", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UpdateTaskInput.prototype, "dueDate", void 0);
UpdateTaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateTaskInput);
exports.UpdateTaskInput = UpdateTaskInput;
//# sourceMappingURL=task-input.js.map