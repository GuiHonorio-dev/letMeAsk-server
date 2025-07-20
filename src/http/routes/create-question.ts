import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from 'zod'
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post("/rooms/:roomId/questions",{
    schema: {
      params: z.object({
        roomId: z.string()
      }),
      body: z.object({
        question: z.string().min(1),
      })
    }
  }, async (request, reply ) => {
    const { roomId } = request.params
    const { question } = request.body
  

    const result = await db
    .insert(schema.questions)
    .values({
      roomId,
      question
    })
    .returning()
    
    
    // Returning para o postgres retornar os dados. Se nao ele so retorna a quantidade de linhas inseridas
    
    const insertedQuestion = result[0]

    if(!insertedQuestion) {
      throw new Error('Failed to create new room.')
    }

    return reply.status(201).send({ questionId: insertedQuestion.id })


  });
};
