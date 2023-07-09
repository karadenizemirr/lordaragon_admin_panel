import { Body, Controller, Get, Param, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { join, resolve } from "path";
import { Setting } from "src/entity/setting.entity";
import AppDataSource from "src/helpers/dbConnect";
import { diskStorage } from "multer";

@Controller('setting')
export class SettingController {

    private settingRepository:any;

    constructor(){
        this.settingRepository = AppDataSource.getRepository(Setting)
    }

    // Get All Setting
    @Get('all')
    async getAllSetting(@Req() req: Request, @Res() res: Response) {
        try{
            const allSetting: Setting[] | null = await this.settingRepository.find()
            res.json(allSetting);
        }catch(err){
            console.log('Get all setting error')
        }
    }

    // Add Setting
    @Post('add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1, },
        { name: 'headerImage', maxCount: 1 },
      ],{
        storage: diskStorage({
            destination: './public',
            filename: (req,file,cb) => {
                const name = file.originalname.split(".")[0].toLowerCase()
                const fileExtension = file.originalname.split(".")[1]
                const newFileName = name.split(" ").join("-") + "-" + Date.now() + "." + fileExtension

                cb(null, newFileName)
            }
        })
      }))

    async addSetting(
        @Req() req:Request, 
        @Res() res:Response, 
        @Body() settingData: Setting,
        @UploadedFiles() files: {logo ?: Express.Multer.File[], headerImage ?: Express.Multer.File[]}
        ){

        try{
            
            for (const [fieldName, fileArray] of Object.entries(files)){
                const file = fileArray?.[0]

                if (file){
                    settingData.logo = file.path
                    settingData.headerImage = file.path
                }
            }

            await this.settingRepository.save(settingData);
            res.json(settingData)
            
        }catch(err){
            console.log('Add Setting Error')
            console.log(err)
        }
    }

    // Get By Id
    @Get('get/:id')
    async getSettingById(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
        try{
            const getSetting = await this.settingRepository.findOneBy({
                id:id
            })
            res.json(getSetting);
        }catch(err){
            console.log('Get By Id Error with Setting')
        }
    }

    // Delete
    @Get('delete/:id')
    async deleteSetting(@Req() req: Request, @Res() res: Response, @Param('id') id:number) {
        try{
            const getSetting = await this.settingRepository.findOneBy({
                id:id
            })
            if (getSetting){
                await this.settingRepository.delete(id);
                res.json('Setting deleted');
            }
        }catch(err){
            console.log('Delete Setting Error')
        }
    }

    // Update
    @Post('update/:id')
    async updateSetting(@Req() req: Request, @Res() res: Response, @Param('id') id:number) {
        try{
            const getSetting = await this.settingRepository.findOneBy({
                id:id
            })
            if (getSetting){
                await this.settingRepository.update(id, req.body);
                res.json(req.body);
            }
        }catch(err){
            console.log('Update Setting Error')
        }
    }
}