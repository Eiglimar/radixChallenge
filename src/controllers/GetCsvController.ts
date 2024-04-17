import { FastifyRequest, FastifyReply } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import { GetCsvService } from "../services/GetCsvService";
import fs from "fs";
import util from "util";
import Papa from "papaparse";

const writeFile = util.promisify(fs.writeFile);

class GetCsvController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const file = await request.file();

      const buffer = await file?.toBuffer();

      if (!buffer) {
        reply.status(500).send("buffer nao foi carregado");
      } else {
        //é preciso se atentar aonde o node está instalado para que seja criada a pasta de tmp para armazenar temporariamente o arquivo a ser subido
        const filePath = `/tmp/${file?.filename}`;
        //console.log(filePath);
        await writeFile(filePath, buffer);
        Papa.parse(buffer.toString(), {
          header: true,
          dynamicTyping: true,
          complete: async function (results) {
            const csvUploadService = new GetCsvService();
            const payloads = await csvUploadService.execute(results.data);
            return payloads;
          },
          error: function () {
            console.error("Parsing error:");
            reply.status(500).send("Error parsing CSV");
          }
        });
      }
      reply.status(200).send({ message: "Envio de CSV com Sucesso" });
    } catch (err) {
      // Send error response
      reply.status(500).send(err);
    }
  }
}

export { GetCsvController };
