import { FastifyReply, FastifyRequest } from "fastify";
import { ListPayloadsService } from "../services/ListPayloadsService";

class ListPayloadsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listPayloadsService = new ListPayloadsService();
    const payloads = await listPayloadsService.execute();
    reply.send(payloads);
  }
}

export { ListPayloadsController };
