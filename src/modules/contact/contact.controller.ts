import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { Contact } from "src/entity/contact.entity";
import { Request, Response } from "express";
import AppDataSource from "src/helpers/dbConnect";

@Controller('contact')
export class ContactController {
    private contactRepository:any;

    constructor(){
        this.contactRepository = AppDataSource.getRepository(Contact)
    }
    

    @Get('all')
    async getAllContact(@Req() req: Request, @Res() res: Response) {
        try{
            const allContact: Contact[] | null = await this.contactRepository.find()
            res.json(allContact);
        }catch(err){
            console.log('Get all contact error')
        }
    }

    @Post('add')
    async addContact(@Req() req: Request, @Res() res: Response, @Body() contactData: Contact){
        try{

            await this.contactRepository.save(contactData);
            res.json(contactData);

        }catch(err){

            console.log('Contact add error')
        }
    }

    @Get('get/:id')
    async getContactById(@Req() req: Request, @Res() res: Response, @Param('id') id: number){
        try{
            const getContact = await this.contactRepository.findOneBy({
                id:id
            })
            res.json(getContact);
        }catch(err){
            console.log('Get contact by id error')
        }
    }

    @Get('delete/:id')
    async deleteContact(@Req() req: Request, @Res() res: Response, @Param('id') id: number){
        try{
            const getContact = await this.contactRepository.findOneBy({
                id:id
            })
            if (getContact){
                await this.contactRepository.delete(id);
                res.json('Contact deleted');
            }
        }catch(err){
            console.log('Delete contact error')
        }
    }

    @Post('update/:id')
    async updateContact(@Req() req: Request, @Res() res: Response, @Param('id') id: number){
        try{
            const getContact = await this.contactRepository.findOneBy({
                id:id
            })
            if (getContact){
                await this.contactRepository.update(id, req.body);
                res.json(req.body);
            }
        }catch(err){
            console.log('Update contact error')
        }
    }
}