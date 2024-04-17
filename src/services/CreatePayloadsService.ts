import prismaClient from "../prisma";

interface CreatePayloadsProps {
  equipmentId: string;
  value: number;
}

class CreatePayloadsService {
  async execute({ equipmentId, value }: CreatePayloadsProps) {
    console.log("ROTA DE CREATE Payload FOI CHAMADA");

    if (!equipmentId || !value) throw new Error("Preencha todos os campos");

    const payloads = await prismaClient.payloads.create({
      data: {
        equipmentId,
        value
      }
    });

    return payloads;
  }
}

export { CreatePayloadsService };
