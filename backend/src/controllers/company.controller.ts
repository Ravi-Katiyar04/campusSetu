import { Request, Response } from "express";
import { CompanyService } from "../services/company.service";
type IdParam = { id: string };

export class CompanyController {

    // ADMIN — Add
    static async create(req: Request, res: Response) {
        const company = await CompanyService.create(req.body);
        res.status(201).json(company);
    }

    // ADMIN — Edit
    static async update(req: Request<IdParam>, res: Response) {
        const company = await CompanyService.update(
            req.params.id,
            req.body
        );
        res.json(company);
    }


    // ADMIN — Delete
    static async remove(req: Request<IdParam>, res: Response) {
        await CompanyService.delete(req.params.id);
        res.json({ message: "Company deleted" });
    }


    // STUDENT — View + Filter
    static async list(req: Request, res: Response) {
        const { year, role } = req.query;

        const filters: any = {};

        if (year) filters.year = Number(year as string);

        if (role) filters.role = {
            contains: role as string,
            mode: "insensitive",
        };


        const companies = await CompanyService.list(filters);
        res.json(companies);
    }
}
