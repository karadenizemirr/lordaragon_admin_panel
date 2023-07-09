/// <reference types="multer" />
import { Request, Response } from "express";
import { Setting } from "src/entity/setting.entity";
export declare class SettingController {
    private settingRepository;
    constructor();
    getAllSetting(req: Request, res: Response): Promise<void>;
    addSetting(req: Request, res: Response, settingData: Setting, files: {
        logo?: Express.Multer.File[];
        headerImage?: Express.Multer.File[];
    }): Promise<void>;
    getSettingById(req: Request, res: Response, id: number): Promise<void>;
    deleteSetting(req: Request, res: Response, id: number): Promise<void>;
    updateSetting(req: Request, res: Response, id: number): Promise<void>;
}
