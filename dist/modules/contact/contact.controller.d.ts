import { Contact } from "src/entity/contact.entity";
import { Request, Response } from "express";
export declare class ContactController {
    private contactRepository;
    constructor();
    getAllContact(req: Request, res: Response): Promise<void>;
    addContact(req: Request, res: Response, contactData: Contact): Promise<void>;
    getContactById(req: Request, res: Response, id: number): Promise<void>;
    deleteContact(req: Request, res: Response, id: number): Promise<void>;
    updateContact(req: Request, res: Response, id: number): Promise<void>;
}
