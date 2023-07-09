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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_entity_1 = require("../../entity/contact.entity");
const dbConnect_1 = require("../../helpers/dbConnect");
let ContactController = exports.ContactController = class ContactController {
    constructor() {
        this.contactRepository = dbConnect_1.default.getRepository(contact_entity_1.Contact);
    }
    async getAllContact(req, res) {
        try {
            const allContact = await this.contactRepository.find();
            res.json(allContact);
        }
        catch (err) {
            console.log('Get all contact error');
        }
    }
    async addContact(req, res, contactData) {
        try {
            await this.contactRepository.save(contactData);
            res.json(contactData);
        }
        catch (err) {
            console.log('Contact add error');
        }
    }
    async getContactById(req, res, id) {
        try {
            const getContact = await this.contactRepository.findOneBy({
                id: id
            });
            res.json(getContact);
        }
        catch (err) {
            console.log('Get contact by id error');
        }
    }
    async deleteContact(req, res, id) {
        try {
            const getContact = await this.contactRepository.findOneBy({
                id: id
            });
            if (getContact) {
                await this.contactRepository.delete(id);
                res.json('Contact deleted');
            }
        }
        catch (err) {
            console.log('Delete contact error');
        }
    }
    async updateContact(req, res, id) {
        try {
            const getContact = await this.contactRepository.findOneBy({
                id: id
            });
            if (getContact) {
                await this.contactRepository.update(id, req.body);
                res.json(req.body);
            }
        }
        catch (err) {
            console.log('Update contact error');
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
], ContactController.prototype, "getAllContact", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, contact_entity_1.Contact]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "addContact", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "getContactById", null);
__decorate([
    (0, common_1.Get)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "deleteContact", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "updateContact", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [])
], ContactController);
//# sourceMappingURL=contact.controller.js.map