import prismaClient from "../prisma";

class GetCsvService {
  async execute(results: any[]) {
    try {
      //filtro para nao pegar a linha vazia da leitura do csv
      var resultadosFiltrados = results
        .filter(function (item) {
          if (!item.equipmentId) {
            return false; // skip
          }
          return true;
        })
        .map(function (item) {
          return item;
        });

      //inserindo os dados filtrados e com a certeza dos dois digitos
      const insertResult = await prismaClient.payloads.createMany({
        data: resultadosFiltrados.map(item => ({
          equipmentId: item.equipmentId,
          timestamp: item.timestamp,
          value: parseFloat(parseFloat(item.value).toFixed(2))
        }))
      });
      return insertResult;
    } catch (error) {
      console.error("Database insertion error:", error);
    }
  }
}

export { GetCsvService };
