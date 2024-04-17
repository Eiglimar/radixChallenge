import prismaClient from "../prisma";

class ListPayloadsService {
  async execute() {
    const payloads = await prismaClient.payloads.findMany();
    return payloads;
  }
}

export { ListPayloadsService };
