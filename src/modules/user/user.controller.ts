import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/entity/user.entity";
import AppDataSource from "src/helpers/dbConnect";
import * as bcrypt from 'bcrypt'

@Controller('user')
export class UserController {
    private userRepository:any;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User)
    }
    @Get("all")
    async getAllUser(@Req() req: Request, @Res() res: Response) {
        try {
            const allUser: User[] | null = await this.userRepository.find();
            res.json({
                "message": "success",
                "data": allUser
            });
        } catch (err) {
            
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
            
        }
    }

    // Add Operations
    @Post("add")
    async addUser(@Req() req: Request, @Res() res: Response, @Body() userData: User) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 5)
            userData.password = hashedPassword
            await this.userRepository.save(userData);
            res.json({
                "message": "success",
                "data": userData
            });

        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Get By ID
    @Get("get/:id")
    async getUserById(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
        try{
            const userByıd = await this.userRepository.findOneBy({
                id:id
            })

            res.json({
                "message": "success",
                "data": userByıd
            });
        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Update User
    @Post("update/:id")
    async updateUser(@Req() req: Request, @Res() res: Response, @Body() userData: User, @Param('id') id:number) {
        try{
            const getUser = this.userRepository.findOneBy({
                id:id
            })

            if (getUser){
                await this.userRepository.update(id, userData);
                res.json({
                    "message": "success",
                    "data": userData
                });
            }
        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
        }
    }

    // Delete User
    @Get('delete/:id')
    async deleteUser(@Req() req: Request, @Res() res: Response, @Param('id') id:number) {
        try{
            const getUser = this.userRepository.findOneBy({
                id:id
            })

            if (getUser){
                await this.userRepository.delete(id);
                res.json({
                    "message": "success"
                });
            }
        }catch(err){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: "Bir sorun meydana geldi."
            }, HttpStatus.BAD_REQUEST)
        }
    }   
}