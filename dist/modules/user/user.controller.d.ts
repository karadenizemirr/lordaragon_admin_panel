import { Request, Response } from "express";
import { User } from "src/entity/user.entity";
export declare class UserController {
    private userRepository;
    constructor();
    getAllUser(req: Request, res: Response): Promise<void>;
    addUser(req: Request, res: Response, userData: User): Promise<void>;
    getUserById(req: Request, res: Response, id: number): Promise<void>;
    updateUser(req: Request, res: Response, userData: User, id: number): Promise<void>;
    deleteUser(req: Request, res: Response, id: number): Promise<void>;
}
