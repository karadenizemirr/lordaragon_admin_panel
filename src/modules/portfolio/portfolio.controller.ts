import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Portfolio } from "src/entity/portfolio.entity";
import AppDataSource from "src/helpers/dbConnect";
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller('portfolio')
export class PortfolioController {
    private portfolioRepository:any

    constructor(){
        this.portfolioRepository = AppDataSource.getRepository(Portfolio)
    }

    @Get('all')
    async getAll(@Req() req: Request, @Res() res: Response){
        try {
            const allPortfolio: Portfolio[] | null = await this.portfolioRepository.find();
            res.json(allPortfolio);
        }catch(err){
            console.log('Portfolio get error')
        }
    }

    @Post('add')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './public/portfolio',
            filename: (req,file,cb) => {
                const name = file.originalname.split(".")[0].toLowerCase()
                const fileExtension = file.originalname.split(".")[1]
                const newFileName = name.split(" ").join("-") + "-" + Date.now() + "." + fileExtension

                cb(null, newFileName)
            }
        })
    }))
    async add(
        @Req() req: Request, 
        @Res() res: Response,
        @Body() portfolioData: Portfolio,
        @UploadedFile() files: Express.Multer.File
        ){

            try{
                portfolioData.image = files.path
                await this.portfolioRepository.save(portfolioData);
                res.json(portfolioData)
            }catch(err){
                console.log('Add portfolio error')
            }
        
    }

    @Get('delete/:id')
    async delete(@Req() req: Request, @Res() res: Response, @Param('id') id:number){
        try{
            const getPortfolio = await this.portfolioRepository.findOneBy({
                id:id
            })
            if (getPortfolio){
                await this.portfolioRepository.delete(id);
                res.json('Portfolio deleted');
            }
        }catch(err){
            console.log('Delete portfolio error')
        }
    }

    @Get('get/:id')
    async get(@Req() req: Request, @Res() res: Response, @Param('id') id:number){
        try{
            const getPortfolio = await this.portfolioRepository.findOneBy({
                id:id
            })
            res.json(getPortfolio);
        }catch(err){
            console.log('Get portfolio by id error')
        }
    }

    @Post('update/:id')
    async updatePortfolio(@Req() req:Request, @Res() res:Response, @Param('id') id:number){
        try{
            const getPortfolio = await this.portfolioRepository.findOneBy({
                id:id
            })
            if (getPortfolio){
                await this.portfolioRepository.update(id, req.body);
                res.json(req.body);
            }
        }catch(err){
            console.log('Update error')
        }
    }    
}