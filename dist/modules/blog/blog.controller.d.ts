import { Blog } from "src/entity/blog.entity";
import { Request, Response } from "express";
export declare class BlogController {
    private blogRepository;
    constructor();
    getAllBlog(req: Request, res: Response): Promise<void>;
    addBlog(req: Request, res: Response, blogData: Blog): Promise<void>;
    deleteBlog(req: Request, res: Response, id: number): Promise<void>;
    get(req: Request, res: Response, id: number): Promise<void>;
    update(req: Request, res: Response, id: number, blogData: Blog): Promise<void>;
}
