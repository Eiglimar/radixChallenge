import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreatePayloadsController } from "./controllers/CreatePayloadsController";
import { ListPayloadsController } from "./controllers/ListPayloadsController";
import { GetCsvController } from "./controllers/GetCsvController";
/*import { DeleteCustomerController } from "./controllers/DeleteCustomerController";*/

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  //rota teste para funcionamento da api
  fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
    return { radix: true };
  });

  //rota para adicionar uma nova leitura de payload
  fastify.post("/newpayload", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreatePayloadsController().handle(request, reply);
  });

  //rota para verificar os payloads ja enviados para o banco
  fastify.get("/payloads", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListPayloadsController().handle(request, reply);
  });
  // Rota para subir o csv
  fastify.post("/subircsv", async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetCsvController().handle(request, reply);
  });
}
