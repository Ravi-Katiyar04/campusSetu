import { prisma } from "../prisma/client";

export class CompanyService {
  static create(data: any) {
    return prisma.company.create({ data });
  }

  static update(id: string, data: any) {
    return prisma.company.update({
      where: { id },
      data,
    });
  }

  static delete(id: string) {
    return prisma.company.delete({
      where: { id },
    });
  }

  // services/companyService.ts

  static list(filters: any, skip = 0, take = 10) {
    return prisma.company.findMany({
      where: filters,
      orderBy: [
        { packageOffered: "desc" }, // primary sorting
        { year: "desc" },           // secondary sorting
      ],
      skip,
      take,
    });
  }
}
