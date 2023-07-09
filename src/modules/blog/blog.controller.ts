import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { Blog } from "src/entity/blog.entity";
import { Request, Response } from "express";
import AppDataSource from "src/helpers/dbConnect";

@Controller('blog')
export class BlogController {
    private blogRepository:any;

    constructor(){
        this.blogRepository = AppDataSource.getRepository(Blog)
    }


    @Get('all')
    async getAllBlog(@Req() req: Request, @Res() res: Response) {
        try{
            const allBlog: Blog[] | null = await this.blogRepository.find()
            res.json(allBlog);
        }catch(err){
            console.log('Get all blog error')
        }
    }

    @Post('add')
    async addBlog(@Req() req: Request, @Res() res: Response, @Body() blogData: Blog){
        try{
            await this.blogRepository.save(blogData);
            res.json(blogData);
        }catch(err){
            console.log('Blog add error')
        }
    }

    @Get('delete/:id')
    async deleteBlog(@Req() req: Request, @Res() res: Response, @Param('id') id: number){
        try{

            const getBlog = this.blogRepository.findOneBy({
                id:id
            })

            if (getBlog){
                await this.blogRepository.delete(id)
            }

            res.json(getBlog)

        }catch(err){
            console.log('Blog delete error')
        }
    }

    @Get('get/:id')
    async get(@Req() req:Request, @Res() res:Response, @Param('id') id:number){
        try {

            const getBlog = await this.blogRepository.findOneBy({
                id:id
            })

            if(getBlog){
                res.json(getBlog)
            }

        }catch(err){
            console.log('Get blog error')
        }
    }

    @Post('update/:id')
    async update(@Req() req:Request, @Res() res:Response, @Param('id') id:number, @Body() blogData:Blog){
        try{

            const getBlog = await this.blogRepository.findOneBy({
                id:id
            })

            if (getBlog){
                await this.blogRepository.update(blogData)
                res.json(blogData)
            }

        }catch(err){
            console.log('Blog update error')
        }
    }

}