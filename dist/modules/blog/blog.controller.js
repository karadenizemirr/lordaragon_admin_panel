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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const blog_entity_1 = require("../../entity/blog.entity");
const dbConnect_1 = require("../../helpers/dbConnect");
let BlogController = exports.BlogController = class BlogController {
    constructor() {
        this.blogRepository = dbConnect_1.default.getRepository(blog_entity_1.Blog);
    }
    async getAllBlog(req, res) {
        try {
            const allBlog = await this.blogRepository.find();
            res.json(allBlog);
        }
        catch (err) {
            console.log('Get all blog error');
        }
    }
    async addBlog(req, res, blogData) {
        try {
            await this.blogRepository.save(blogData);
            res.json(blogData);
        }
        catch (err) {
            console.log('Blog add error');
        }
    }
    async deleteBlog(req, res, id) {
        try {
            const getBlog = this.blogRepository.findOneBy({
                id: id
            });
            if (getBlog) {
                await this.blogRepository.delete(id);
            }
            res.json(getBlog);
        }
        catch (err) {
            console.log('Blog delete error');
        }
    }
    async get(req, res, id) {
        try {
            const getBlog = await this.blogRepository.findOneBy({
                id: id
            });
            if (getBlog) {
                res.json(getBlog);
            }
        }
        catch (err) {
            console.log('Get blog error');
        }
    }
    async update(req, res, id, blogData) {
        try {
            const getBlog = await this.blogRepository.findOneBy({
                id: id
            });
            if (getBlog) {
                await this.blogRepository.update(blogData);
                res.json(blogData);
            }
        }
        catch (err) {
            console.log('Blog update error');
        }
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlog", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, blog_entity_1.Blog]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addBlog", null);
__decorate([
    (0, common_1.Get)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, blog_entity_1.Blog]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
exports.BlogController = BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [])
], BlogController);
//# sourceMappingURL=blog.controller.js.map