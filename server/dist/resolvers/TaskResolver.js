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
exports.TaskResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Task_1 = require("../entity/Task");
const task_input_1 = require("../schema/task-input");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
let TaskResolver = class TaskResolver {
    constructor() {
        this.taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
    }
    async tasks() {
        return await this.taskRepository.find();
    }
    async task(id) {
        return await this.taskRepository.findOneBy({ id });
    }
    async tasksByStatus(completed) {
        return await this.taskRepository.find({ where: { completed } });
    }
    async createTask(data) {
        var _a;
        const task = this.taskRepository.create({
            ...data,
            priority: (_a = data.priority) !== null && _a !== void 0 ? _a : 'green'
        });
        return await this.taskRepository.save(task);
    }
    async updateTask(data) {
        const task = await this.taskRepository.findOneByOrFail({ id: data.id });
        if (data.title !== undefined)
            task.title = data.title;
        if (data.description !== undefined)
            task.description = data.description;
        if (data.completed !== undefined)
            task.completed = data.completed;
        if (data.priority !== undefined)
            task.priority = data.priority;
        return await this.taskRepository.save(task);
    }
    async deleteTask(id) {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task)
            return false;
        await this.taskRepository.remove(task);
        return true;
    }
    async toggleMultipleTasksStatus(ids, completed) {
        const tasks = await this.taskRepository.findBy({ id: (0, typeorm_1.In)(ids) });
        if (tasks.length === 0)
            return [];
        tasks.forEach(task => {
            task.completed = completed;
        });
        return await this.taskRepository.save(tasks);
    }
    async tasksByPriority(priority) {
        return await this.taskRepository.find({
            where: { priority },
            order: { priority: 'DESC' }
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => Task_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "task", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __param(0, (0, type_graphql_1.Arg)('completed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasksByStatus", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_input_1.CreateTaskInput]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_input_1.UpdateTaskInput]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [Task_1.Task]),
    __param(0, (0, type_graphql_1.Arg)('ids', () => [String])),
    __param(1, (0, type_graphql_1.Arg)('completed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Boolean]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "toggleMultipleTasksStatus", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __param(0, (0, type_graphql_1.Arg)('priority', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasksByPriority", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);
exports.TaskResolver = TaskResolver;
//# sourceMappingURL=TaskResolver.js.map