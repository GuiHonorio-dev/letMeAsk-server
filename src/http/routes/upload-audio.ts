import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from 'zod'
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post("/rooms/:roomId/audio",{
    schema: {
      params: z.object({
        roomId: z.string()
      })
    }
  }, async (request, reply ) => {
    const { roomId } = request.params

    const audio = await request.file()

    if(!audio) {
      throw new Error('Auido is required.')
    }

    // Transcrever o audio
    // Gerar o vetor semantico / embeddings
    // Armazenar os vetores no banco de dados
  });
};
