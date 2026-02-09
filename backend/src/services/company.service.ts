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

  static list(filters: any) {
    return prisma.company.findMany({
      where: filters,
      orderBy: { year: "desc" },
    });
  }
}
