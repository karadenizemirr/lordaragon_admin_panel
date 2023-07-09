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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../entity/user.entity");
const dbConnect_1 = require("../../helpers/dbConnect");
const bcrypt = require("bcrypt");
let UserController = exports.UserController = class UserController {
    constructor() {
        this.userRepository = dbConnect_1.default.getRepository(user_entity_1.User);
    }
    async getAllUser(req, res) {
        try {
            const allUser = await this.userRepository.find();
            res.json(allUser);
        }
        catch (err) {
            console.log('Get All User Error:', err);
            res.status(500).json({ error: 'An error occurred while fetching users' });
        }
    }
    async addUser(req, res, userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 5);
            userData.password = hashedPassword;
            await this.userRepository.save(userData);
            res.json(userData);
        }
        catch (err) {
            console.log('Add user error');
        }
    }
    async getUserById(req, res, id) {
        try {
            const userByıd = await this.userRepository.findOneBy({
                id: id
            });
            res.json(userByıd);
        }
        catch (err) {
            console.log('Get By Id Error with User');
        }
    }
    async updateUser(req, res, userData, id) {
        try {
            const getUser = this.userRepository.findOneBy({
                id: id
            });
            if (getUser) {
                await this.userRepository.update(id, userData);
                res.json(userData);
            }
        }
        catch (err) {
            console.log('User update error');
        }
    }
    async deleteUser(req, res, id) {
        try {
            const getUser = this.userRepository.findOneBy({
                id: id
            });
            if (getUser) {
                await this.userRepository.delete(id);
                res.json('User deleted');
            }
        }
        catch (err) {
            console.log('User delete error');
        }
    }
};
__decorate([
    (0, common_1.Get)("all"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)("add"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)("get/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)("update/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [])
], UserController);
//# sourceMappingURL=user.controller.js.map