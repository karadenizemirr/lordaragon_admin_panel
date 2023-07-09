/// <reference types="multer" />
import { Portfolio } from "src/entity/portfolio.entity";
import { Request, Response } from "express";
export declare class PortfolioController {
    private portfolioRepository;
    constructor();
    getAll(req: Request, res: Response): Promise<void>;
    add(req: Request, res: Response, portfolioData: Portfolio, files: Express.Multer.File): Promise<void>;
    delete(req: Request, res: Response, id: number): Promise<void>;
    get(req: Request, res: Response, id: number): Promise<void>;
    updatePortfolio(req: Request, res: Response, id: number): Promise<void>;
}
