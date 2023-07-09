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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_entity_1 = require("../../entity/portfolio.entity");
const dbConnect_1 = require("../../helpers/dbConnect");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let PortfolioController = exports.PortfolioController = class PortfolioController {
    constructor() {
        this.portfolioRepository = dbConnect_1.default.getRepository(portfolio_entity_1.Portfolio);
    }
    async getAll(req, res) {
        try {
            const allPortfolio = await this.portfolioRepository.find();
            res.json(allPortfolio);
        }
        catch (err) {
            console.log('Portfolio get error');
        }
    }
    async add(req, res, portfolioData, files) {
        try {
            portfolioData.image = files.path;
            await this.portfolioRepository.save(portfolioData);
            res.json(portfolioData);
        }
        catch (err) {
            console.log('Add portfolio error');
        }
    }
    async delete(req, res, id) {
        try {
            const getPortfolio = await this.portfolioRepository.findOneBy({
                id: id
            });
            if (getPortfolio) {
                await this.portfolioRepository.delete(id);
                res.json('Portfolio deleted');
            }
        }
        catch (err) {
            console.log('Delete portfolio error');
        }
    }
    async get(req, res, id) {
        try {
            const getPortfolio = await this.portfolioRepository.findOneBy({
                id: id
            });
            res.json(getPortfolio);
        }
        catch (err) {
            console.log('Get portfolio by id error');
        }
    }
    async updatePortfolio(req, res, id) {
        try {
            const getPortfolio = await this.portfolioRepository.findOneBy({
                id: id
            });
            if (getPortfolio) {
                await this.portfolioRepository.update(id, req.body);
                res.json(req.body);
            }
        }
        catch (err) {
            console.log('Update error');
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
], PortfolioController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/portfolio',
            filename: (req, file, cb) => {
                const name = file.originalname.split(".")[0].toLowerCase();
                const fileExtension = file.originalname.split(".")[1];
                const newFileName = name.split(" ").join("-") + "-" + Date.now() + "." + fileExtension;
                cb(null, newFileName);
            }
        })
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, portfolio_entity_1.Portfolio, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updatePortfolio", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map