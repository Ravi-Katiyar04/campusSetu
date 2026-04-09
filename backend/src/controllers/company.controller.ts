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

    static async getById(req: Request<IdParam>, res: Response) {
        try {
            const company = await CompanyService.getById(req.params.id);    
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }
            res.json(company);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch company", error });
        }
    }


    // STUDENT — View + Filter

    static async list(req: Request, res: Response) {
        try {
            const { year, role, package: pkg, search, page, limit } = req.query;

            const filters: any = {};

            // YEAR
            if (year) {
                filters.year = Number(year as string);
            }

            // ROLE (case-insensitive)
            if (role) {
                filters.role = {
                    contains: role as string,
                    mode: "insensitive",
                };
            }

            // SEARCH (company name)
            if (search) {
                filters.name = {
                    contains: search as string,
                    mode: "insensitive",
                };
            }

            // PACKAGE FILTER
            if (pkg) {
                const value = pkg as string;

                if (value === "5+") filters.packageOffered = { gte: 5 };
                if (value === "10+") filters.packageOffered = { gte: 10 };
                if (value === "15+") filters.packageOffered = { gte: 15 };
                if (value === "20+") filters.packageOffered = { gte: 20 };
            }

            // PAGINATION
            const pageNum = Number(page) || 1;
            const limitNum = Number(limit) || 10;
            const skip = (pageNum - 1) * limitNum;

            const companies = await CompanyService.list(filters, skip, limitNum);

            res.json(companies);
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch companies", error });
        }
    }
}
