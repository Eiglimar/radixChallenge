import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePayloadsService } from "../services/CreatePayloadsService";

class CreatePayloadsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { equipmentId, value } = request.body as { equipmentId: string; value: number };

    const payloadsService = new CreatePayloadsService();

    const payloads = await payloadsService.execute({ equipmentId, value });

    reply.send(payloads);
  }
}

export { CreatePayloadsController };
