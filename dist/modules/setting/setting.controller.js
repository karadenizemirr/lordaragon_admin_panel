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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const setting_entity_1 = require("../../entity/setting.entity");
const dbConnect_1 = require("../../helpers/dbConnect");
const multer_1 = require("multer");
let SettingController = exports.SettingController = class SettingController {
    constructor() {
        this.settingRepository = dbConnect_1.default.getRepository(setting_entity_1.Setting);
    }
    async getAllSetting(req, res) {
        try {
            const allSetting = await this.settingRepository.find();
            res.json(allSetting);
        }
        catch (err) {
            console.log('Get all setting error');
        }
    }
    async addSetting(req, res, settingData, files) {
        try {
            for (const [fieldName, fileArray] of Object.entries(files)) {
                const file = fileArray?.[0];
                if (file) {
                    settingData.logo = file.path;
                    settingData.headerImage = file.path;
                }
            }
            await this.settingRepository.save(settingData);
            res.json(settingData);
        }
        catch (err) {
            console.log('Add Setting Error');
            console.log(err);
        }
    }
    async getSettingById(req, res, id) {
        try {
            const getSetting = await this.settingRepository.findOneBy({
                id: id
            });
            res.json(getSetting);
        }
        catch (err) {
            console.log('Get By Id Error with Setting');
        }
    }
    async deleteSetting(req, res, id) {
        try {
            const getSetting = await this.settingRepository.findOneBy({
                id: id
            });
            if (getSetting) {
                await this.settingRepository.delete(id);
                res.json('Setting deleted');
            }
        }
        catch (err) {
            console.log('Delete Setting Error');
        }
    }
    async updateSetting(req, res, id) {
        try {
            const getSetting = await this.settingRepository.findOneBy({
                id: id
            });
            if (getSetting) {
                await this.settingRepository.update(id, req.body);
                res.json(req.body);
            }
        }
        catch (err) {
            console.log('Update Setting Error');
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
], SettingController.prototype, "getAllSetting", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'logo', maxCount: 1, },
        { name: 'headerImage', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './public',
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
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, setting_entity_1.Setting, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "addSetting", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "getSettingById", null);
__decorate([
    (0, common_1.Get)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "deleteSetting", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateSetting", null);
exports.SettingController = SettingController = __decorate([
    (0, common_1.Controller)('setting'),
    __metadata("design:paramtypes", [])
], SettingController);
//# sourceMappingURL=setting.controller.js.map